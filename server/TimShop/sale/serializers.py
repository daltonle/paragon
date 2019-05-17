from rest_framework import serializers
from .models import SaleRecord, SoldItem
from customers.serializers import CustomerSerializer
from customers.models import Customer
from productModel.serializers import  PModelSerializer
from productModel.models import  PModel

class SaleRecordSerializer(serializers.ModelSerializer):
    customer_id = serializers.PrimaryKeyRelatedField(queryset=Customer.objects.all(), source='customer_id')

    class Meta:
        model = SaleRecord
        fields = ('customer_id', 'date', 'value', 'discount','items')




