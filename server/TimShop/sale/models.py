from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class SaleRecord(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    total = models.FloatField()
    discount = models.FloatField()

    def __str__(self):
        return self.user +" "+ self.date

class SoldItem(models.Model):
    SaleRecord = models.ForeignKey(SaleRecord, on_delete=models.CASCADE)
    modelSupplyBy = models.ForeignKey('productModel.ModelSupplyBy', on_delete=models.CASCADE)
