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
        instance.name = validated_data.get("title", instance.name)
        instance.email = validated_data.get("email", instance.email)
        instance.address = validated_data.get("title", instance.address)
        instance.phone = validated_data.get("title", instance.phone)
        instance.creditLine = validated_data.get("title", instance.creditLine)
        instance.balance = validated_data.get("title", instance.balance)
        instance.isMember = validated_data.get("title", instance.isMember)
        instance.joinDate = validated_data.get("title", instance.joinDate)
        instance.save()
        keep_type =[]
        existingType_ids = [t.id for t in instance.type]
        for type in type_data:
            if "id" in type_data.key():
                if Type.objects.filter(id=type["id"]).exist():
                    t = Type.objects.get(id=type["id"])
                    t.name = type.get('name',t.name)
                    t.save
                    keep_type.append(t.id)
                else:
                    continue
            else:
                t = Type.objects.create(**type, customer = instance)
                keep_type.append(t.id)

        for type in instance.type:
            if type.id not in keep_type:
                type.delete()
        for type in type_data:
            Type.objects.create(**type, customer = instance)



        keep_subject=[]
        existingSubject_ids = [s.id for s in instance.subject]
        for subject in subject_data:
            if "id" in subject_data.key():
                if Subject.objects.filter(id=subject["id"]).exist():
                    s =Subject.objects.get(id=subject["id"])
                    s.name = subject.get('name',s.name)
                    s.save
                    keep_subject.append(s.id)
                else:
                    continue
            else:
                s = Subject.objects.create(**subject, customer = instance)
                keep_subject.append(s.id)

        for subject in instance.subject:
            if subject.id not in keep_subject:
                subject.delete()

        return instance










