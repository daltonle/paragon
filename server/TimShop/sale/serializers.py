from rest_framework import serializers
from .models import SaleRecord
from customers.serializers import CustomerSerializer
from customers.models import Customer
from productModel.serializers import  PModelSerializer
from productModel.models import  PModel

class SaleRecordSerializer(serializers.ModelSerializer):
    customerId = serializers.PrimaryKeyRelatedField(queryset=Customer.objects.all())

    class Meta:
        model = SaleRecord
        fields = ('id','customerId', 'date', 'value', 'discount','items')





