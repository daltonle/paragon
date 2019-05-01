from django.db import models

# Create your models here.

class SaleRecord(models.Model):
    buyer = models.ForeignKey('customers.Customer', on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    total = models.FloatField()
    discount = models.FloatField()

    def __str__(self):
        return self.user +" "+ self.date

class SoldItem(models.Model):
    SaleRecord = models.ForeignKey(SaleRecord, on_delete=models.CASCADE)
    modelSupplyBy = models.ForeignKey('productModel.ModelSupplyBy', on_delete=models.CASCADE)
