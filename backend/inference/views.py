from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticated
from accounts.permissions import CustomDjangoModelPermissions, CreatingAsOneself
from inference.models import InferenceModel, InferenceJob
from inference.serializers import InferenceModelSerializer, InferenceJobSerializer


class InferenceModelViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Inference Models viewset
    """

    queryset = InferenceModel.objects.all()
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
