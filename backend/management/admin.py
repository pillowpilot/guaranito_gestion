from django.contrib import admin
from management.models import Parcel, Lot


@admin.register(Lot)
class LotAdmin(admin.ModelAdmin): ...


@admin.register(Parcel)
class ParcelAdmin(admin.ModelAdmin): ...
