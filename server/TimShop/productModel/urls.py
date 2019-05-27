from django.urls import path, include
from rest_framework import routers


from .views import (
    PModelViewSet,
    SupplierViewSet,
    SupplierCatalogueViewSet,
    OrderHistoryViewSet
)

router = routers.DefaultRouter()
router.register('SupplierCatalogue', SupplierCatalogueViewSet)
router.register('Supplier', SupplierViewSet)
router.register('Model', PModelViewSet)
router.register('Order', OrderHistoryViewSet)
urlpatterns = [
    path('', include(router.urls)),

]