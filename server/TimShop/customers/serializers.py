from .models import Customer, Subject, Type
from rest_framework import serializers


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject

class TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type


class CustomerSerializer(serializers.ModelSerializer):
    # subjectArea = serializers.PrimaryKeyRelatedField(queryset=Subject.objects.all(), many=True)
    # modelType = serializers.PrimaryKeyRelatedField(queryset=Type.objects.all(), many=True)

    class Meta:
        model = Customer
        fields = ('name',
                  'email',
                  'address',
                  'phone',
                  'creditLine',
                  'balance',
                  'isMember',
                  'joinDate',
                  'subjectInterests',
                  'modelTypeInterests',
                      # 'subjectArea',
                      # 'modelType'
                  )









