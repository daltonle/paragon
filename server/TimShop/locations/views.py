from django.shortcuts import render
from rest_framework import viewsets
from .serializers import LocationSerializer
from .models import Location
# Create your views here.

class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

