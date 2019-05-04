from django.urls import path, include
from rest_framework import routers


from .views import (
    CustomerViewSet
)

router = routers.DefaultRouter()
router.register('customers', CustomerViewSet)
urlpatterns = [
    path('', include(router.urls)),

]