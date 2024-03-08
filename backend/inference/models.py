from django.db import models
from django.utils.translation import gettext_lazy as _


class InferenceModel(models.Model):
    """
    Inference models.
    """

    name = models.CharField(max_length=50)
    display_name = models.CharField(max_length=50)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(_("date created"), auto_now_add=True)
    updated_at = models.DateTimeField(_("date updated"), auto_now=True)

    class Meta:
        ordering = ["created_at"]

    def __str__(self) -> str:
        return self.__repr__()

    def __repr__(self) -> str:
        return f"InferenceModel(name={self.name}, display_name={self.display_name})"
