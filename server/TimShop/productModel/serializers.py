from rest_framework import serializers
from .models import PModel, SupplierCatalogue,Supplier


class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = ('name', 'address','creditLine', 'hasCreditLine', 'balance', 'deliveryNotes', 'contactPerson')


class PModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = PModel
        fields = ('name', 'type','subject', 'inStock', 'price', 'dateAcquired', 'location', 'description', 'availability')


class SupplierCatalogueSerializer(serializers.ModelSerializer):
    pModel_id = serializers.PrimaryKeyRelatedField(queryset=PModel.objects.all(), source='item', required=False)
    supplier_id = serializers.PrimaryKeyRelatedField( queryset=Supplier.objects.all(), source='supplier', required=False)

    class Meta:
        model = SupplierCatalogue
        fields = ('supplier_id', 'pModel_id', 'price', 'availability')


class OrderHistorySerializer(serializers.ModelSerializer):
    supplierId = serializers.PrimaryKeyRelatedField(queryset=Supplier.objects.all(), source='supplierId')

    class Meta:
        model = PModel
        fields = ('id', 'time', 'value', 'items', 'supplierId',)
        read_only_fields = ('id')




