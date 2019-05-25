from rest_framework import permissions
from .models import BlackListedToken


class IsLoggedInUserOrAdmin(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        return obj == request.user or request.user.is_superuser or is_admin(request)


class IsSuperUser(permissions.BasePermission):

    def has_permission(self, request, view):
        return request.user and (request.user.is_superuser or is_admin(request))

    def has_object_permission(self, request, view, obj):
        return request.user and (request.user.is_superuser or is_admin(request))

def is_admin(request):
    if hasattr(request.user, 'profile'):
        return request.user.profile.group == "Admin"
    return False


class IsTokenValid(permissions.BasePermission):
    def has_permission(self, request, view):
        user_id = request.user.id
        is_allowed_user = True
        token = request.auth.decode("utf-8")
        try:
            is_blackListed = BlackListedToken.objects.get(user=user_id, token=token)
            if is_blackListed:
                is_allowed_user = False
        except BlackListedToken.DoesNotExist:
            is_allowed_user = True
        return is_allowed_user
