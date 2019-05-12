from django.db import models
from productModel.choices import STATUS_CHOICES
from django.utils.translation import gettext as _

# Create your models here.
class Supplier(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, null=False, blank=False)
    address = models.CharField(max_length=255, null=False, blank=False)
    creditLine = models.CharField(max_length=10)
    hasCreditLine = models.BooleanField(default=False, null=False)
    balance = models.DecimalField(max_length=4, null=False)
    deliveNotesr = models.CharField(max_length=255)
    contactPerson = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class PModel(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255,null=False)
    type = models.IntegerField(choices=STATUS_CHOICES, default=1)
    subject = models.IntegerField(choices=STATUS_CHOICES, default=1)
    inStock = models.IntegerField(null=False)
    price = models.DecimalField()
    dateAcquired = models.DateField(auto_now_add=True, null=False, blank=False)
    location = models.ForeignKey("locations.Location", null=True,on_delete=models.SET_NULL)
    description = models.CharField(max_length=500, null=True)
    availabilty = models.BooleanField(null=False, default=False)

    def __str__(self):
        return self.name


class ModelSupp(models.Model):
    class Meta:
        unique_together = (('supplier', 'pModel'),)

    supplier = models.ForeignKey(Supplier,related_name="supplier", on_delete=models.CASCADE)
    pModel = models.ForeignKey(PModel,related_name='pModel', on_delete=models.CASCADE)
    price = models.FloatField()
    availability = models.IntegerField()

    def __str__(self):
        return '%s: %s' % (self.pModel.name, self.supplier.name)

class OrderHistory(models.Model):
    id = models.AutoField(primary_key=True)
    supplierId = models.ForeignKey(Supplier, related_name='id', on_delete=models.CASCADE,null=False)
    time = models.DateTimeField(null=False)
    value = models.DecimalField(null=False)
    items = models.CharField(max_length=255, null=False)

    def __str__(self):
        return self.id

class SupplierCatalogue(models.Model):
    id = models.AutoField(primary_key=True)
    supplierId = models.ForeignKey(Supplier, related_name='id', on_delete=models.CASCADE, null=False)
    itemId = models.ForeignKey(PModel, related_name='id', on_delete=models.CASCADE, null=False)
    price = models.DecimalField(null=False)
