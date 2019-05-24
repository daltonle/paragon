from django.db import models
from .choices import SUBJECT_CHOICES, MODEL_CHOICES
from django.utils.translation import gettext as _

# Create your models here.
class Supplier(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, null=False, blank=False)
    address = models.CharField(max_length=255, null=False, blank=False)
    creditLine = models.CharField(max_length=10, null=True, blank=True)
    hasCreditLine = models.BooleanField(default=False, null=False)
    balance = models.DecimalField(null=False, max_digits=6, decimal_places=2)
    deliveryNotes = models.CharField(max_length=255, null=True, blank=True)
    contactPerson = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.name

class PModel(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255,null=False)
    type = models.CharField(max_length= 255, choices=MODEL_CHOICES, default=6)
    subject = models.CharField(max_length= 255,choices=SUBJECT_CHOICES, default=4)
    inStock = models.IntegerField(null=False)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    dateAcquired = models.DateField(null=False, blank=False)
    location = models.ForeignKey("locations.Location", null=True,on_delete=models.SET_NULL)
    description = models.CharField(max_length=500, null=True, blank=True)
    availability = models.BooleanField(null=False, default=False)

    def __str__(self):
        return self.name

class Order(models.Model):
    id = models.AutoField(primary_key=True)
    supplierId = models.ForeignKey(Supplier, related_name='supplierId', on_delete=models.CASCADE,null=False)
    time = models.DateTimeField(null=False)
    value = models.DecimalField(null=False, max_digits=6, decimal_places=2)
    items = models.CharField(max_length=255, null=False)

    def __str__(self):
        return self.id


class SupplierCatalogue(models.Model):
    id = models.AutoField(primary_key=True)
    supplier = models.ForeignKey(Supplier, related_name='supplier', on_delete=models.CASCADE, null=False)
    item = models.ForeignKey(PModel, related_name='item', on_delete=models.CASCADE, null=False)
    price = models.DecimalField(null=False, max_digits=6, decimal_places=2)

    def __str__(self):
        return '%s: %s' % (self.pModel.name, self.supplier.name)