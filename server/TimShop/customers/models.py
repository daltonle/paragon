from django.db import models

# Create your models here.
class Customer(models.Model):
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    phoneNum = models.IntegerField(max_length=255)
    creditLine = models.FloatField(max_length=255)
    curBalance = models.FloatField(max_length=255)
    email = models.EmailField(max_length=255)
    status = models.CharField(max_length=20)
    joinDate = models.DateTimeField(auto_now_add=True)


class Interest(models.Model):
    owner = models.ForeignKey(Customer,on_delete=models.CASCADE)
    subjectArea = models.CharField(max_length=255)
    type = models.CharField(max_length=255)



