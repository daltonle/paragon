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
    pModel = PModelSerializer(many=False, read_only=True)
    pModel_id = serializers.PrimaryKeyRelatedField(queryset=PModel.objects.all(), source='pModel', write_only=True, required=False)
    supplier = SupplierSerializer(many=False, read_only=True)
    supplier_id = serializers.PrimaryKeyRelatedField( queryset= Supplier.objects.all(), source='supplier',
                                                      write_only=True, required=False)

    class Meta:
        model = ModelSupp
        fields = ('supplier','supplier_id','pModel','pModel_id','price','availability')


