from django.db import models
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver
# Create your models here.

User = get_user_model()

class Profile(models.Model):
    owner = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    #additional information of customer here is we need to add more
    created_date = models.DateTimeField(auto_now_add=True)
    address = models.CharField(max_length=255,null=True, blank=True)
    phoneNum = models.IntegerField(null=True, blank=True)
    isFrontstaff = models.BooleanField(default=False)
    isBackstaff= models.BooleanField(default=False)




