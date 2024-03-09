from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from accounts.permissions import CustomDjangoModelPermissions, CreatingAtSameCompany
from accounts.models import User
from management.models import Parcel
from management.serializers import ParcelSerializer


class ParcelViewSet(viewsets.ModelViewSet):
    """
    Parcel Model Viewset

    It filters the queryset by the logged in user's company.
    It also replaces the usual drop db operation with a 'logical drop' for easy undo and
    filters access using Django's permissions:
    "publicapp.view_parcel" for list and retrieve actions,
    "publicapp.add_parcel" for create action,
    "publicapp.change_parcel" for update action, and
    "publicapp.delete_parcel" for destroy action.
    """

    serializer_class = ParcelSerializer
    permission_classes = [
        IsAuthenticated & CreatingAtSameCompany & CustomDjangoModelPermissions
    ]

    def get_queryset(self):
        """
        This view should allow access only to the parcels
        related to the authenticated user's company.
        If the user is not logged in, return an empty queryset.
        """
        # This is a workaround for swagger-ui. It returns an empty queryset when
        # the user is not logged in. This is not a problem for the rest of the app.
        if getattr(self, "swagger_fake_view", False):
            return Parcel.objects.none()

        user: User = self.request.user  # type: ignore
        company = user.company
        if company:
            return Parcel.objects.filter(company=company, is_active=True)
        else:
            return Parcel.objects.none()

    def perform_destroy(self, instance) -> None:
        """
        Replace usual drop db operation with a 'logical drop' for easy undo.

        Each parcel has an 'is_active' bool field that indicates if that instance is
        presented to the end user. If the user deletes an instance, 'is_active' is
        set to false and the instance is effectively deleted from the user's POV.
        However, the instance data is still present in the database.

        This is done to allow an admin to undo the 'logical delete' and bring the
        instance data back.

        Also each lot and inference job associated to the parcel is also logically deleted.

        :param instance: Parcel instance to be deleted.
        :return: None.
        """
        instance.is_active = False

        # lots = instance.lot_set.all()
        # for lot in lots:
        #     lot.is_active = False

        #     inferences = lot.inferencejob_set.filter(is_active=True)
        #     for inference in inferences:
        #         inference.is_active = False
        #         inference.save()

        #     lot.save()

        instance.save()

    # @action(detail=True, methods=["get"], url_path="lots")
    # def get_lots(self, request, pk=None) -> Response:
    #     """
    #     Returns the lots of the parcel.

    #     :param request: Request object.
    #     :param pk: Primary key of the parcel.
    #     :return: Response object with the lots of the parcel.
    #     """
    #     parcel = self.get_object()
    #     lots = parcel.lot_set.all()
    #     lots = LotSerializer(lots, many=True).data
    #     return Response(lots)

    @action(detail=False, methods=["get"])
    def total(self, request) -> Response:
        """
        Returns the numeber of active parcels. Its name is parcel-total.

        :param request: Request object.
        :return: Response object with the number of active parcels.
        """
        total = Parcel.objects.filter(is_active=True).count()
        return Response({"total": total}, status=status.HTTP_200_OK)
