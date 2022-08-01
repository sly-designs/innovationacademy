from rest_framework.permissions import BasePermission


class isAdminUser(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_admin)


class isParentUser(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_parent)
