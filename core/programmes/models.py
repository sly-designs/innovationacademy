from django.db import models

# Create your models here.


class Programme(models.Model):
    title = models.CharField(max_length=255)
    price = models.IntegerField()
    description = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    minAge = models.IntegerField()
    maxAge = models.IntegerField()
    duration = models.IntegerField()

    def __str__(self):
        return self.title


class Cohort(models.Model):
    name = models.CharField(max_length=255)
    start = models.DateField()
    end = models.DateField()
    programme_id = models.ForeignKey(
        Programme, related_name='cohorts', on_delete=models.CASCADE)
