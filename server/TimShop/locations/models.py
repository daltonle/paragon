from django.db import models

# Create your models here.
class Location(models.Model):
    street = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    postcode = models.IntegerField(max_length=255)


