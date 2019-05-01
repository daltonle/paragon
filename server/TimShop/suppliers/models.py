from django.db import models

# Create your models here.

class Supplier(models.Model):
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    deliver = models.CharField(max_length=255)
    contactPerson = models.CharField(max_length=255)
    creditLine = models.CharField(max_length=255)



