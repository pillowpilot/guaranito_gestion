from rest_framework import serializers
from inference.models import InferenceModel


class InferenceModelSerializer(serializers.ModelSerializer):
    """
    Serializer for Inference Models

    Print an InferenceModelSerializer to see details
    """

    class Meta:
        model = InferenceModel
        fields = ["id", "name", "created_at", "updated_at"]
