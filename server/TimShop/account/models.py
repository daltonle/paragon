from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
# Create your models here.

#model for customer
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    #additional information of customer here is we need to add more
    created_date = models.DateTimeField(auto_now_add=True)
    address = models.CharField(max_length=255,null=True, blank=True)
    phoneNum = models.IntegerField(null=True, blank=True)
    creditLine = models.FloatField(null=True, blank=True)
    balance = models.FloatField(null=True, blank=True)
    # objects = models.Manager()

    #automatically create profile when user is created
    @receiver(post_save, sender=User)
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            Profile.objects.create(user=instance)


    #automatically save profile when user is created
    @receiver(post_save, sender=User)
    def save_user_profile(sender, instance, **kwargs):
        instance.profile.save()

class Interest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    subject_area = models.CharField(max_length=255)
    type = models.CharField(max_length=255)




