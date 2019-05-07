from rest_framework import serializers
from .models import SaleRecord, SoldItem
from customers.serializers import CustomerSerializer
from productModel.serializers import ModelSuppSerializer

class SaleRecordSerializer(serializers.ModelSerializer):
    buyer = CustomerSerializer(many=False)

    class Meta:
        model = SaleRecord
        fields = ('buyer', 'date', 'total', 'discount',)


class SoldItemSerializer(serializers.ModelSerializer):
    saleRecord = SaleRecordSerializer(many=False)
    modelSupp = ModelSuppSerializer(many=False)

    class Meta:
        model = SoldItem
        fields = ('saleRecord', 'modelSupp',)


