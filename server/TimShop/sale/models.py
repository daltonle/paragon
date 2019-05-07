from django.db import models

# Create your models here.


class SaleRecord(models.Model):
    buyer = models.ForeignKey('customers.Customer',related_name='buyer' ,on_delete=models.CASCADE, default=None)
    date = models.DateTimeField(auto_now_add=True)
    total = models.FloatField()
    discount = models.FloatField()

    def __str__(self):
        return '%s: %d' % (self.date, self.total)


class SoldItem(models.Model):
    saleRecord = models.ForeignKey(SaleRecord,related_name='saleRecord', on_delete=models.CASCADE)
    modelSupp = models.ForeignKey('productModel.ModelSupp', related_name='modelSupp', on_delete=models.CASCADE,)

    def __str__(self):
        return self.modelSupp
