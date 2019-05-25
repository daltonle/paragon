from rest_framework import permissions


class IsSuperUser(permissions.BasePermission):

    def has_permission(self, request, view):
        return request.user and (request.user.is_superuser or is_admin(request))

    def has_object_permission(self, request, view, obj):
        return request.user and (request.user.is_superuser or is_admin(request))



def is_admin(request):
    if hasattr(request.user, 'profile'):
        return request.user.profile.group == "Admin"
    return False