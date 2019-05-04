from django.shortcuts import render
from rest_framework import viewsets
from .models import SaleRecord, SoldItem
from .serializers import SaleRecordSerializer, SoldItemSerializer
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
class SaleRecordViewSet(viewsets.ModelViewSet):
    queryset = SaleRecord.objects.all()
    serializer_class = SaleRecordSerializer


class SoldItemViewSet(viewsets.ModelViewSet):
    queryset = SoldItem.objects.all()
    serializer_class = SoldItemSerializer

