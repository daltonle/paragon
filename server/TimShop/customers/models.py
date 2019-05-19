from django.db import models
from django.utils.translation import gettext as _
from .choices import MODEL_CHOICES, SUBJECT_CHOICES
from enum import Enum


# Create your models here.



class Customer(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, null=False, blank=False)
    email = models.EmailField(max_length=255)
    address = models.CharField(max_length=255)
    phone = models.CharField(_('Phone'), max_length=11, null=False, blank=False)
    creditLine = models.CharField(_('credit line'), max_length=10)
    hasCreditLine = models.BooleanField(null=False, blank=False, default=False)
    balance = models.DecimalField(max_digits=6, decimal_places=2, default=0, null=False, blank=False)
    isMember = models.BooleanField(null=False, blank=False, default=False)
    joinDate = models.DateTimeField()
    subjectInterests = models.CharField(max_length=255, choices=SUBJECT_CHOICES)
    modelTypeInterests = models.CharField(max_length=255, choices=MODEL_CHOICES)

    def __str__(self):
        return '%s: %s' % (self.name, self.email)


class Subject(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, choices=SUBJECT_CHOICES)
    customer = models.ManyToManyField(Customer, related_name="customerS")

    def __str__(self):
        return self.name


class Type(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, choices=MODEL_CHOICES)
    customer = models.ManyToManyField(Customer, related_name="customerT")

    def __str__(self):
        return self.name
