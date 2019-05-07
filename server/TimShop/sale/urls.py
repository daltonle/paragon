from django.urls import path, include
from rest_framework import routers


from .views import (
    SaleRecordViewSet,
    SoldItemViewSet,
)

router = routers.DefaultRouter()
router.register('SaleRecord', SaleRecordViewSet)
router.register('SoldItem', SoldItemViewSet)

urlpatterns = [
    path('', include(router.urls)),

]