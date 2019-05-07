from django.urls import path, include
from rest_framework import routers


from .views import (
    PModelViewSet,
    SupplierViewSet,
    ModelSuppViewSet,
)

router = routers.DefaultRouter()
router.register('ModelSupp', ModelSuppViewSet)
router.register('Supplier', SupplierViewSet)
router.register('Model', PModelViewSet)
urlpatterns = [
    path('', include(router.urls)),

]