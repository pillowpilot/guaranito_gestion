from django.db import models
from django.utils.translation import gettext_lazy as _
from accounts.models import User


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


class InferenceJob(models.Model):
    """
    Inference jobs.
    """

    user = models.ForeignKey(User, on_delete=models.RESTRICT)
    model = models.ForeignKey(InferenceModel, on_delete=models.RESTRICT)
    image = models.ImageField(upload_to="inference_jobs_images", null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(_("date created"), auto_now_add=True)
    updated_at = models.DateTimeField(_("date updated"), auto_now=True)

    class Meta:
        ordering = ["created_at"]

    def __str__(self) -> str:
        return self.__repr__()

    def __repr__(self) -> str:
        if self.is_active:
            return f"InferenceJob(user={self.user}, model={self.model})"
        else:
            return f"InferenceJob(user={self.user}, model={self.model}, is_active={self.is_active})"
