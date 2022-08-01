from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.


class Kid(models.Model):
    fullname = models.CharField(max_length=255)
    dob = models.DateField()
    programme_id = models.CharField(max_length=255, default="", blank=True)
    cohort_id = models.CharField(max_length=255, default="", blank=True)
    parent_id = models.ForeignKey(
        User, related_name="kids", on_delete=models.CASCADE)

    def __str__(self):
        return self.fullname
