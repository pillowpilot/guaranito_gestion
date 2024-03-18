from rest_framework import viewsets, mixins, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from accounts.permissions import CustomDjangoModelPermissions, CreatingAsOneself
from inference.models import InferenceModel, InferenceJob
from inference.serializers import InferenceModelSerializer, InferenceJobSerializer
from inference.services.gps import extract_coordinates, Coordinates
from inference.services.yolo_inference import (
    YOLOInferenceResult,
    LeavesClassNames,
    FruitsClassNames,
    perform_fruits_diseases_inference,
    perform_leaves_diseases_inference,
    draw_yolo_boxes_on_image,
)
from inference.services.deepforest_inference import perform_tree_counting_inference
from inference.services.post_inference import (
    cleanup_after_deepforest_inference,
    generate_thumbnail,
)


class InferenceModelViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Inference Models viewset
    """

    queryset = InferenceModel.objects.filter(is_active=True)
    serializer_class = InferenceModelSerializer
    permission_classes = [IsAuthenticated]


class InferenceJobViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    """
    Inference Job viewset

    Only supports list, retrieve, create and destroy. It does not support update.
    """

    serializer_class = InferenceJobSerializer
    permission_classes = [
        IsAuthenticated & CreatingAsOneself & CustomDjangoModelPermissions
    ]

    def get_queryset(self):
        # This is a workaround for swagger-ui. It returns an empty queryset when
        # the user is not logged in. This is not a problem for the rest of the app.
        if getattr(self, "swagger_fake_view", False):
            return InferenceJob.objects.none()

        user = self.request.user
        company = user.company
        if company:
            return InferenceJob.objects.filter(user__company=company)
        else:
            return InferenceJob.objects.none()

    def perform_create(self, serializer):
        super().perform_create(serializer)

        job = serializer.instance

        job.status = "processing"
        job.save()

        image_filepath = job.image.path
        coords: Coordinates = extract_coordinates(image_filepath)
        if coords:
            job.latitude = coords.latitude
            job.longitude = coords.longitude
            job.save()

        results: YOLOInferenceResult | None = None
        class_names: LeavesClassNames | FruitsClassNames | None = None

        model = job.model
        if model.name == "leafs":
            results = perform_leaves_diseases_inference(image_filepath)
            class_names = LeavesClassNames()
            if results:
                job.status = "success"
            else:
                job.status = "failure"

        elif model.name == "fruits":
            results = perform_fruits_diseases_inference(image_filepath)
            class_names = FruitsClassNames()
            if results:
                job.status = "success"
            else:
                job.status = "failure"

        elif model.name == "trees":
            chain = (
                perform_tree_counting_inference.s(image_filepath)
                | cleanup_after_deepforest_inference.s(job.id)
                | generate_thumbnail.s(job.id)
            )
            chain.delay()
            job.status = "processing"

        else:
            job.status = "failure"
        job.save()

        if results and class_names:
            draw_yolo_boxes_on_image(
                image_filepath, results, class_names.generate_class_name_list()
            )
            generate_thumbnail(None, job.id)

    def perform_destroy(self, instance):
        """
        Replace usual drop db operation with a 'logical drop' for easy undo.

        Each inference job has an 'is_active' bool field that indicates if that instance is
        presented to the end user. If the user deletes an instance, 'is_active' is
        set to false and the instance is effectively deleted from the user's POV.
        However, the instance data is still present in the database.

        This is done to allow an admin to undo the 'logical delete' and bring the
        instance data back.

        :param instance: InferenceJob instance to be deleted.
        :return: None.
        """
        instance.is_active = False
        instance.save()

    @action(detail=False, methods=["GET"])
    def total(self, request):
        """
        Returns the numeber of active inference jobs. Its name is inferencejob-total.

        :param request: Request object.
        :return: Response object with the number of active inference jobs.
        """
        total = InferenceJob.objects.filter(is_active=True).count()
        return Response({"total": total}, status=status.HTTP_200_OK)
