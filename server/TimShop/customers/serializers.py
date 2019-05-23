from .models import Customer, Subject, Type
from rest_framework import serializers


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
        subject_data = validated_data.pop('subject')
        type_data = validated_data.pop('type')
        # set new value for customer if validated else keep the same
        instance.name = validated_data.get("name", instance.name)
        instance.email = validated_data.get("email", instance.email)
        instance.address = validated_data.get("address", instance.address)
        instance.phone = validated_data.get("phone", instance.phone)
        instance.creditLine = validated_data.get("creditLine", instance.creditLine)
        instance.balance = validated_data.get("balance", instance.balance)
        instance.isMember = validated_data.get("isMember", instance.isMember)
        instance.joinDate = validated_data.get("joinDate", instance.joinDate)
        instance.save()

        keep_subject = [] #keep name of subject that customer have
        # check if customer already has the subject or not
        for subject in subject_data:
            if Subject.objects.filter(name=subject["name"], customer = instance).exists():
                    keep_subject.append(s.name)
            else:
                s = Subject.objects.create(**subject, customer=instance)
                keep_subject.append(s.name)

        # delete subject interest that is not in array of keep subject
        for subject in instance.subject.all():
            if subject.name not in keep_subject:
                subject.delete()

        # same pattern could be turned into a function maybe?
        keep_type =[]
        for type in type_data:
            if Type.objects.filter(name=type["name"], customer = instance).exists():
                   keep_type.append(t.name)
            else:
                t = Type.objects.create(**type, customer = instance)
                keep_type.append(t.name)

        for type in instance.type.all():
            if type.name not in keep_type:
                type.delete()

        return instance










