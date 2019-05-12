from .models import Customer, Interest
from rest_framework import serializers


class InterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interest
        fields = ('subjectArea', 'type',)


class CustomerSerializer(serializers.ModelSerializer):
    interests = serializers.StringRelatedField(many=True)
    class Meta:
        model = Customer
        fields = ('name', 'address', 'phoneNum', 'creditLine', 'curBalance', 'email', 'status', 'interests')

        def create(self, validated_data):
            interest_data = validated_data.pop('interests')
            customer_obj = Customer.objects.create(**validated_data)

            for interest in interest_data:
                 Interest.objects.create(owner = customer_obj, **interest)
            return customer_obj

        def update(self, instance, validated_data):
            interest_data = validated_data.pop('interests')

            instance.name = validated_data.get('name', instance.name)
            instance.address = validated_data.get('address', instance.address)
            instance.phoneNum = validated_data.get('phoneNum', instance.phoneNum)
            instance.creditLine = validated_data.get('creditLine', instance.creditLine)
            instance.curBalance = validated_data.get('curBalance', instance.curBalance)
            instance.email = validated_data.get('email', instance.email)
            instance.status = validated_data.get('status', instance.status)
            for interest in interest_data:
                interest, created = Interest.objects.get_or_create(
                    owner=instance,
                    subjectArea=interest['subjectArea'],
                    type=interest['type'],
                )

            return instance





