from rest_framework import serializers
from .models import PModel, ModelSupp,Supplier



class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = ('name', 'address', 'deliver', 'contactPerson', 'creditLine')


class PModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = PModel
        fields = ('name', 'type', 'subjectArea', 'quantity', 'location', 'description')


class ModelSuppSerializer(serializers.ModelSerializer):
    supplier = SupplierSerializer(many=False)
    pModel = PModelSerializer(many=False)

    class Meta:
        model = ModelSupp
        fields = ('supplier','pModel','price','availability')


