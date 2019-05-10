from django.shortcuts import render
from rest_framework import viewsets
from .models import SaleRecord, SoldItem
from .serializers import SaleRecordSerializer, SoldItemSerializer
from rest_framework.response import Response
from rest_framework import status

from rest_framework.permissions import (
    IsAuthenticated,
    IsAdminUser,
)
from .permissions import IsSuperUser

# Create your views here.
class SaleRecordViewSet(viewsets.ModelViewSet):
    queryset = SaleRecord.objects.all()
    serializer_class = SaleRecordSerializer

    def get_permissions(self):
        permission_classes = []
        if self.action == 'create' or self.action == 'retrieve' or self.action == 'update' or self.action == 'partial_update':
            permission_classes = [IsAuthenticated, IsAdminUser]
        elif self.action == 'list' or self.action == 'destroy':
            permission_classes = [IsSuperUser]
        return [permission() for permission in permission_classes]


class SoldItemViewSet(viewsets.ModelViewSet):
    queryset = SoldItem.objects.all()
    serializer_class = SoldItemSerializer

    def get_permissions(self):
        permission_classes = []
        if self.action == 'create' or self.action == 'retrieve' or self.action == 'update' or self.action == 'partial_update':
            permission_classes = [IsAuthenticated, IsAdminUser]
        elif self.action == 'list' or self.action == 'destroy':
            permission_classes = [IsSuperUser]
        return [permission() for permission in permission_classes]

