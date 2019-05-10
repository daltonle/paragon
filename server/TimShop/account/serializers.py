from rest_framework import serializers
from .models import Profile
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError

from rest_framework_jwt.settings import api_settings

User = get_user_model()


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('address', 'phoneNum',)

    def update(self, instance, validated_data):
        address = validated_data.get('address',instance.address)
        phoneNum = validated_data.get('phoneNum', instance.phoneNum)
        instance.save()
        return instance


class UserLoginSerializer(serializers.ModelSerializer):
    token = serializers.CharField(allow_blank=True, read_only=True)
    username = serializers.CharField()
    password = serializers.CharField(write_only=True,style={'input_type': 'password', 'placeholder': 'password'})

    class Meta:
        model = User
        fields = ['username', 'password', 'token']

    def validate(self,data):
        username = data.get("username")
        password = data["password"]
        user_obj = None
        if not username:
            raise ValidationError("username required")
        user_obj = User.objects.get(username = username)
        if not user_obj:
            raise ValidationError("wrong username or password")
        else:
            if not user_obj.check_password(password):
                raise ValidationError("wrong username or password")

        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(user_obj)
        data["token"] = jwt_encode_handler(payload)

        return data


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(required=False)
    password = serializers.CharField(write_only=True,style={'input_type': 'password', 'placeholder': 'password'})
    repassword = serializers.CharField(write_only=True, style={'input_type': 'password', 'placeholder': 'password'}, label='re-enter password')

    class Meta:
        model = User
        fields = ['username', 'password', 'repassword', 'first_name', 'last_name', 'email', 'profile',]

    def validate_password(self, value):
        data = self.get_initial()
        password = data.get("password")
        repassword = value
        if password != repassword:
            raise ValidationError("password does not match")
        return value

    def create(self, validated_data):
        user_obj = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )
        user_obj.set_password(validated_data['password'])
        user_obj.save()
        profile_data = validated_data.pop('profile')
        Profile.objects.create(owner = user_obj, **profile_data)
        return validated_data

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username',instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get(' last_name', instance. last_name)
        profile_data = validated_data.pop('profile')
        profile = instance.profile
        profile.address = profile_data.get('address',profile.address)
        profile.phoneNum = profile_data.get('phoneNum',profile.phoneNum)
        profile.save()
        instance.save()
        return instance



