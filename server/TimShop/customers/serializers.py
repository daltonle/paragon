from .models import Customer
from rest_framework import serializers




class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ('name','email', 'address', 'phone', 'creditLine', 'balance',  'isMember', 'joinDate', 'subjectInterests', 'typeInterest')








