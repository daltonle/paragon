from django.db import models

# Create your models here.

class PModel(models.Model):
    name = models.CharField(max_length=255,null=False)
    type = models.CharField(max_length=255,null=False)
    subjectArea = models.CharField(max_length=255, null=False)
    quantity = models.IntegerField()
    location = models.CharField(max_length=255)
    description = models.CharField(max_length=500, null=True)

    def __str__(self):
        return self.name

class Supplier(models.Model):
    name = models.CharField(max_length=255, null=False)
    address = models.CharField(max_length=255)
    deliverDetail = models.CharField(max_length=255)
    contactPerson = models.CharField(max_length=255)
    creditLine  = models.FloatField()

    def __str__(self):
        return self.name


class ModelSupplyBy(models.Model):
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE)
    sModel = models.ForeignKey(PModel, on_delete=models.CASCADE)
    price = models.FloatField()
    availability = models.IntegerField()

    def __str__(self):
        return self.sModel.name + "by" + self.supplier.name