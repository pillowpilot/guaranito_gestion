from django.contrib import admin
from inference.models import InferenceJob, InferenceModel


@admin.register(InferenceModel)
class InferenceModelAdmin(admin.ModelAdmin): ...


@admin.register(InferenceJob)
class InferenceJobAdmin(admin.ModelAdmin): ...
