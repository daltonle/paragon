from django.db import models

# Create your models here.

class PModel(models.Model):
    name = models.CharField(max_length=255,null=False)
    type = models.CharField(max_length=255,null=False)
    subjectArea = models.CharField(max_length=255, null=False)
    quantity = models.IntegerField()
    location = models.ForeignKey("locations.Location", null=True)
    description = models.CharField(max_length=500, null=True)

    def __str__(self):
        return self.name


class ModelSupplyBy(models.Model):
    supplier = models.ForeignKey("suppliers.Supplier", on_delete=models.CASCADE)
    sModel = models.ForeignKey(PModel, on_delete=models.CASCADE)
    price = models.FloatField()
    availability = models.IntegerField()

    def __str__(self):
        return self.sModel.name + "by" + self.supplier.name