from django.db import models

# Create your models here.
class Users(models.Model):
    user = models.CharField(max_length=30, unique=True, null=False)
    password = models.CharField(max_length=128, null=False)
    email = models.EmailField(unique= True, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "User",
        verbose_name_plural = "Users"


    def __str__(self):
        return self.user
    