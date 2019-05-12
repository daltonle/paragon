from django.db import models
from django.utils.translation import gettext as _

# Create your models here.
class Customer(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, null=False, blank=False)
    email = models.EmailField(max_length=255)
    address = models.CharField(max_length=255)
    phone = models.CharField(_('Phone'), max_length=11, null=False, blank=False)
    creditLine = models.CharField(_('credit line'), max_length=10)
    hasCreditLine = models.BooleanField(null=False, blank=False, default=False)
    balance = models.DecimalField(max_length=4, default=0, null=False, blank=False)
    isMember = models.BooleanField(null=False, blank=False, default=False)
    joinDate = models.DateTimeField()
    subjectInterests = models.CharField(max_length=255)
    modelTypeInterests = models.CharField(max_length=255)

    def __str__(self):
        return '%s: %s' % (self.name, self.email)

class Interest(models.Model):
    owner = models.ForeignKey(Customer, related_name='interests', on_delete=models.CASCADE)
    subjectArea = models.CharField(max_length=255)
    type = models.CharField(max_length=255)

    def __str__(self):
        return '%d: %s' % (self.subjectArea, self.type)


