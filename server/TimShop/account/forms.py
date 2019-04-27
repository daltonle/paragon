from django.forms import ModelForm
from .models import Profile, User


class UserModelForm(ModelForm):
    class Meta:
        model = User
        field = ('first_name', 'last_name', 'email', 'address', 'phoneNum', 'creditLine', 'balance', )


class ProfileModelForm(ModelForm):
    class Meta:
        model = Profile
        field = ('url', 'created_date')

