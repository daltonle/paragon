from django.db import models

# Create your models here.
class Location(models.Model):
    id = models.AutoField(primary_key=True)
    street = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    postcode = models.IntegerField()

    def __str__(self):
        return '%s %s %s %s ' % (self.street, self.city, self.state, self.postcode)


