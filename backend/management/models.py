from django.db import models
from django.utils.translation import gettext_lazy as _
from accounts.models import Company


class Parcel(models.Model):
    """
    Parcel model for storing the parcel details. It extends the default django Model model.
    A parcel is a (posibly empty) group of lots.
    """

    name = models.CharField(max_length=100)
    # geodata = models.FileField(upload_to="geodata_parcels", null=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    geodata = models.FileField(upload_to="parcel_geodata", blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(_("date created"), auto_now_add=True)
    updated_at = models.DateTimeField(_("date updated"), auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return self.__repr__()

    def __repr__(self) -> str:
        return f"Parcel(name={self.name}, company={self.company})"


class Lot(models.Model):
    """
    Lot model for storing the lot details. It extends the default django Model model.
    A lot is a associated with a (posibly empty) group of inferences.
    """

    name = models.CharField(max_length=100)
    parcel = models.ForeignKey(Parcel, on_delete=models.CASCADE)
    geodata = models.FileField(upload_to="lots_geodata", blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(_("date created"), auto_now_add=True)
    updated_at = models.DateTimeField(_("date updated"), auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return self.__repr__()

    def __repr__(self) -> str:
        if self.is_active:
            return f"Lot(name={self.name}, parcel={self.parcel})"
        else:
            return f"Lot(name={self.name}, parcel={self.parcel}, is_active={self.is_active})"
