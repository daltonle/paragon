from django.shortcuts import render
from rest_framework import viewsets
from .models import PModel, Supplier, ModelSupp
from .serializers import PModelSerializer, SupplierSerializer, ModelSuppSerializer
from locations.models import Location
from rest_framework.response import Response
from rest_framework import status

# Create your views here.


class PModelViewSet(viewsets.ModelViewSet):
    queryset = PModel.objects.all()
    serializer_class = PModelSerializer


class SupplierViewSet(viewsets.ModelViewSet):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer



class ModelSuppViewSet(viewsets.ModelViewSet):
    queryset = ModelSupp.objects.all()
    serializer_class = ModelSuppSerializer

    def create(self, validated_data):
        serializer = self.get_serializer(data=self.request.data)

        location_id = self.request.data.pop('Location_id')
        Location_instance = Location.objects.filter(id=location_id).first()
        if not serializer.is_valid():
            print
            serializer.errors
        data = serializer.validated_data
        serializer.save(location=Location)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

