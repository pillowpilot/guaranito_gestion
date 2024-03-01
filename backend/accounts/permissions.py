from rest_framework.permissions import BasePermission, DjangoModelPermissions

class CustomDjangoModelPermissions(DjangoModelPermissions):
    """
    Custom permissions for DjangoModelPermissions.

    Allows 'GET' requests if the user has the 'view' permission.
    Allows 'POST' requests if the user has the 'add' permission.
    Allows 'PUT' and 'PATCH' requests if the user has the 'change' permission.
    Allows 'DELETE' requests if the user has the 'delete' permission.

    See: https://www.django-rest-framework.org/api-guide/permissions/#djangomodelpermissions
    """
    perms_map = {
        'GET': ['%(app_label)s.view_%(model_name)s'],
        'OPTIONS': [],
        'HEAD': [],
        'POST': ['%(app_label)s.add_%(model_name)s'],
        'PUT': ['%(app_label)s.change_%(model_name)s'],
        'PATCH': ['%(app_label)s.change_%(model_name)s'],
        'DELETE': ['%(app_label)s.delete_%(model_name)s'],
    }

class IsItself(BasePermission):
    """
    Object-level permission to allow access to their own user data.

    Allows retrieval of user data with id equals to request.user.id.
    Denies everything else.
    """
    def has_permission(self, request, view):
        return view.action == 'retrieve'
    
    def has_object_permission(self, request, view, obj):        
        return request.user.id == obj.id
