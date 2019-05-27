from django.shortcuts import render
from rest_framework import viewsets
from .models import PModel, Supplier, SupplierCatalogue, Order
from .serializers import PModelSerializer, SupplierSerializer, SupplierCatalogueSerializer, OrderSerializer
from locations.models import Location
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import (
    IsAuthenticated,
    IsAdminUser,
)
from .permissions import IsSuperUser
# Create your views here.


class PModelViewSet(viewsets.ModelViewSet):
    queryset = PModel.objects.all()
    serializer_class = PModelSerializer

    def get_permissions(self):
        permission_classes = []
        if self.action == 'create' or self.action == 'retrieve' or self.action == 'update' or self.action == 'partial_update':
            permission_classes = [IsAuthenticated]
        elif self.action == 'list' or self.action == 'destroy':
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]


class SupplierViewSet(viewsets.ModelViewSet):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer

    def get_permissions(self):
        permission_classes = []
        if self.action == 'list' or self.action == 'retrieve':
            permission_classes = [IsAuthenticated]
        elif self.action == 'create' or self.action == 'destroy' or self.action == 'update' or self.action == 'partial_update':
            permission_classes = [IsSuperUser]
        return [permission() for permission in permission_classes]



class SupplierCatalogueViewSet(viewsets.ModelViewSet):
    queryset = SupplierCatalogue.objects.all()
    serializer_class = SupplierCatalogueSerializer

    def get_permissions(self):
        permission_classes = []
        if self.action == 'list' or self.action == 'retrieve' :
            permission_classes = [IsAuthenticated]
        elif self.action == 'create' or self.action == 'destroy' or self.action == 'update' or self.action == 'partial_update':
            permission_classes = [IsSuperUser]
        return [permission() for permission in permission_classes]


class OrderHistoryViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_permissions(self):
        permission_classes = []
        if self.action == 'list' or self.action == 'retrieve':
            permission_classes = [IsAuthenticated]
        elif  self.action == 'create' or self.action == 'destroy' or self.action == 'update' or self.action == 'partial_update':
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
