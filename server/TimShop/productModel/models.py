from django.db import models

# Create your models here.
class Supplier(models.Model):
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    deliver = models.CharField(max_length=255)
    contactPerson = models.CharField(max_length=255)
    creditLine = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class PModel(models.Model):
    name = models.CharField(max_length=255,null=False)
    type = models.CharField(max_length=255,null=False)
    subjectArea = models.CharField(max_length=255, null=False)
    quantity = models.IntegerField()
    location = models.ForeignKey("locations.Location", null=True,on_delete=models.SET_NULL)
    description = models.CharField(max_length=500, null=True)

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