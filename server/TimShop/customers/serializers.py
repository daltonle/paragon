from .models import Customer, Subject, Type
from rest_framework import serializers

#refactoring function to extract data from subject and type interest since they both have similar paraneter list



class SubjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = Subject
        fields = ('name',)


class TypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Type
        fields = ('name',)



class CustomerSerializer(serializers.ModelSerializer):
    subject = SubjectSerializer(many=True, required=False)
    type = TypeSerializer(many=True, required=False)

    class Meta:
        model = Customer
        fields = ('id',
                  'name',
                  'email',
                  'address',
                  'phone',
                  'hasCreditLine',
                  'creditLine',
                  'balance',
                  'isMember',
                  'joinDate',
                  'subject',
                  'type',
                  )

    # override create for nested serializer
    def create(self, validated_data):
        subject_data = validated_data.pop('subject')#pop subject data
        type_data = validated_data.pop('type')#pop type data
        customer_obj = Customer.objects.create(**validated_data)
        for s in subject_data:
            Subject.objects.create(**s,customer = customer_obj)
        for t in type_data:
            Type.objects.create(**t, customer = customer_obj)
        return customer_obj



    #override update for nested serializer
    def update(self, instance, validated_data):
        # set new value for customer if validated else keep the same
        instance.name = validated_data.get("name", instance.name)
        instance.email = validated_data.get("email", instance.email)
        instance.address = validated_data.get("address", instance.address)
        instance.phone = validated_data.get("phone", instance.phone)
        instance.hasCreditLine = validated_data.get("hasCreditLine", instance.creditLine)
        instance.creditLine = validated_data.get("creditLine", instance.creditLine)
        instance.balance = validated_data.get("balance", instance.balance)
        instance.isMember = validated_data.get("isMember", instance.isMember)
        instance.joinDate = validated_data.get("joinDate", instance.joinDate)
        instance.save()
        interestUpdate(self,validated_data,instance,'subject')
        interestUpdate(self,validated_data,instance,'type')
        return instance

def interestUpdate(self, validated_data, instance, column):
    types = {'type': Type, 'subject': Subject}
    col = {'type': instance.type, 'subject': instance.subject}
    keep = []
    datas = validated_data.pop(column)
    for data in datas:
        if types[column].objects.filter(name=data["name"], customer=instance).exists():
            keep.append(data["name"])
        else:
            t = types[column].objects.create(**data, customer=instance)
            keep.append(t.name)
    for data in col[column].all():
        if data.name not in keep:
            data.delete()













