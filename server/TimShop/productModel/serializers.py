from rest_framework import serializers
from .models import PModel, SupplierCatalogue,Supplier, Order


class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = ('id','name', 'address','creditLine', 'hasCreditLine', 'balance', 'deliveryNotes', 'contactPerson')


class PModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = PModel
        fields = ('id','name', 'type','subject', 'inStock', 'price', 'dateAcquired', 'location', 'description', 'availability')


class SupplierCatalogueSerializer(serializers.ModelSerializer):
    pModel_id = serializers.PrimaryKeyRelatedField(queryset=PModel.objects.all(), source='item', required=False)
    supplier_id = serializers.PrimaryKeyRelatedField( queryset=Supplier.objects.all(), source='supplier', required=False)

    class Meta:
        model = SupplierCatalogue
        fields = ('id','supplier_id', 'pModel_id', 'price', )


class OrderSerializer(serializers.ModelSerializer):
    supplierId = serializers.PrimaryKeyRelatedField(queryset=Supplier.objects.all())

    class Meta:
        model = Order
        fields = ('id', 'time', 'value', 'items', 'supplierId',)
        read_only_fields = ('id',)




