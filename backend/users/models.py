from django.db import models

# Create your models here.
class Users(models.Model):
    user = models.CharField(max_length=30, unique=True, null=False)
    password = models.CharField(max_length=128, null=False)
    email = models.EmailField(unique= True, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"


    def __str__(self):
        return self.user

class Profile(models.Model):
    INVESTOR_TYPES = [
        ('conservador', 'Conservador'), 
        ('moderado', 'Moderado'), 
        ('agressivo', 'Agressivo')
    ]

    user = models.OneToOneField(Users, on_delete=models.CASCADE)
    type_of_investor = models.CharField(
        max_length=20,
        choices=INVESTOR_TYPES,
        null=True,
        blank=True)

    class Meta:
        verbose_name = "Profile"
        verbose_name_plural = "Profiles"

    def __str__(self):
        return f"Perfil de {self.user.user}"
    
