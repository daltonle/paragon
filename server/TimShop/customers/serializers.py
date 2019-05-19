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
    subject = SubjectSerializer(many=True, source="customerS")
    type = TypeSerializer(many=True, source="customerT")

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
                  'subjectInterests',
                  'modelTypeInterests',
                  'subject',
                  'type'
                  )

    def create(self, validated_data):
        subject_data = validated_data.pop('subject')
        type_data = validated_data.pop('type')
        customer_obj = Customer.objects.create(**validated_data)
        for subject in subject_data:
            Subject.objects.create(**subject,customer = customer_obj)
        for type in type_data:
            Type.objects.create(**type, customer = customer_obj)
        return customer_obj

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
        for type in type:
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










