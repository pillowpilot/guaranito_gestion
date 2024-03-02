from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from accounts.models import User
from accounts.serializers import UserSerializer
from accounts.permissions import CustomDjangoModelPermissions, IsItself, CreatingAtSameCompany


class UserViewSet(viewsets.ModelViewSet):
    """
    User Model Viewset

    It filters the queryset to only return CustomUser objects that belong to the same company as the user.
    And filters access using Django's permissions:
    "accounts.view_customuser" for list and retrieve actions,
    "accounts.add_customuser" for create action,
    "accounts.change_customuser" for update action, and
    "accounts.delete_customuser" for destroy action.
    
    Allows access to own data if the user is logged in, regardless of the user's permissions.
    """
    serializer_class = UserSerializer

    # Must be authenticated and must not try to create a new user in another company
    # Given those conditions, respect the user permissions and allow read access to itself
    permission_classes = [IsAuthenticated & CreatingAtSameCompany & (CustomDjangoModelPermissions | IsItself)]

    def get_queryset(self):
        """
        This method is used to get the queryset for the User Model Viewset.

        It returns a queryset of CustomUser objects that belong to the same company as the user.
        If no company, returns empty queryset.
        """
        # This is a workaround for swagger-ui. It returns an empty queryset when
        # the user is not logged in. This is not a problem for the rest of the app.
        if getattr(self, 'swagger_fake_view', False):
            return User.objects.none()
        
        user: User = self.request.user # type: ignore
        company = user.company
        if company:
            return User.objects.filter(company=company)
        else:
            return User.objects.none()
