from django.contrib import admin
from accounts.models import Company, User


@admin.register(User)
class UserAdmin(admin.ModelAdmin): ...


@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin): ...
