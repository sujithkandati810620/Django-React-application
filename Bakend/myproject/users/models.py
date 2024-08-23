from django.db import models


class User(models.Model):
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    address = models.CharField(max_length=255)
    age = models.IntegerField()
    phone = models.CharField(max_length=15)

    def __str__(self):
        return self.username
