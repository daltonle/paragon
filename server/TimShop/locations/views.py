from django.shortcuts import render
from rest_framework import viewsets
from .serializers import LocationSerializer
from .models import Location
from rest_framework.permissions import (
    IsAuthenticated,
    IsAdminUser,
)
from .permissions import IsSuperUser
# Create your views here.

class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

    def get_permissions(self):
        permission_classes = []
        if self.action == 'create' or self.action == 'retrieve' or self.action == 'update' or self.action == 'partial_update':
            permission_classes = [IsAuthenticated,IsAdminUser]
        elif self.action == 'list' or self.action == 'destroy':
            permission_classes = [IsSuperUser]
        return [permission() for permission in permission_classes]
