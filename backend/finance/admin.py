from django.contrib import admin
from .models import GeneralInformation, Goal, Debit, Category, Transaction

# Register your models here.
admin.site.register(GeneralInformation)
admin.site.register(Goal)
admin.site.register(Debit)
admin.site.register(Category)
admin.site.register(Transaction)
