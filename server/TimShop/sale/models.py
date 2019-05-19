from django.db import models
from productModel.models import PModel
# Create your models here.


class SaleRecord(models.Model):
    id = models.AutoField(primary_key=True)
    customerId = models.ForeignKey('customers.Customer', related_name='customer_id', on_delete=models.CASCADE, null=False)
    date = models.DateTimeField(auto_now_add=True, null=False, blank=False)
    value = models.FloatField(null=False, blank=False)
    discount = models.FloatField(null=False, blank=False)
    items = models.CharField(max_length=255, null=False, blank=False)

    def __str__(self):
        return '%s: %d' % (self.date, self.total)


# class SoldItem(models.Model):
#     saleRecord = models.ForeignKey(SaleRecord,related_name='saleRecord', on_delete=models.CASCADE)
#     items = models.CharField(max_length=255)
#     # items = models.ManyToManyField(PModel, related_name='model', on_delete= models.CASCADE, null = False )
#
#     def __str__(self):
#         return self.items
