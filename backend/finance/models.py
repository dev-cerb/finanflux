from django.db import models
from django.conf import settings


class GeneralInformation(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    salary = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    limit = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)

    class Meta:
        verbose_name = "General Information"
        verbose_name_plural = "General Informations"

    def __str__(self):
        return f'User {self.user.username} - Salário {self.salary} - Limite de gastos estipulados {self.limit}'

class Goal(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    final_value = models.DecimalField(max_digits=12, decimal_places=2)
    current_value = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    start_date = models.DateField(auto_now_add=True)
    end_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Goal"
        verbose_name_plural = "Goals"

    def progress_percentage(self):
        if self.final_value > 0:
            return (self.current_value / self.final_value) * 100
        return 0

    def __str__(self):
        return f"Meta: {self.name} ({self.user.username})"
    
class Debit(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    total_value = models.DecimalField(max_digits=12, decimal_places=2)
    current_value = models.DecimalField(max_digits=12, decimal_places=2)
    due_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Debit"
        verbose_name_plural = "Debits"

    def __str__(self):
        return f'Dívida {self.name} - Valor Total {self.total_value} / Pago {self.current_value} ({self.user.username})'
    
class Category(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    budget = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"

    def __str__(self):
        return f"Categoria {self.name} de usuário {self.user.username}"
    
class Transaction(models.Model):
    TRANSACTION_TYPES = [
        ('entrada', 'Entrada'),
        ('saida', 'Saída')
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date = models.DateField()
    type_of_transaction = models.CharField(
        max_length=10,
        choices=TRANSACTION_TYPES,
        default="saida"
    )
    description = models.CharField(max_length=120, null=True, blank=True)
    value = models.DecimalField(max_digits=12, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)

    class Meta:
        verbose_name = "Transaction"
        verbose_name_plural = "Transactions"

    def __str__(self):
        return f'{self.type_of_transaction} - {self.value} ({self.user.username})'