from django.db import models
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver
# Create your models here.

User = get_user_model()

class Profile(models.Model):
    GROUP_CHOICES = (
        ("Staff", "Staff"),
        ("Admin", "Admin")
    )
    owner = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    #additional information of customer here is we need to add more
    created_date = models.DateTimeField(auto_now_add=True)
    address = models.CharField(max_length=255,null=True, blank=True)
    phoneNum = models.IntegerField(null=True, blank=True)
    group = models.CharField(max_length=1, choices=GROUP_CHOICES, default="Staff")
    
# store token of logged out user
class BlackListedToken(models.Model):
    token = models.CharField(max_length=500)
    user = models.ForeignKey(User, related_name="token_user", on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("token", "user")




