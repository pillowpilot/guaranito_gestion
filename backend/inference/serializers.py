from rest_framework import serializers
from accounts.models import User
from inference.models import InferenceModel, InferenceJob


class InferenceModelSerializer(serializers.ModelSerializer):
    """
    Serializer for Inference Models

    Print an InferenceModelSerializer to see details
    """

    class Meta:
        model = InferenceModel
        fields = ["id", "name", "created_at", "updated_at"]


class InferenceJobSerializer(serializers.ModelSerializer):
    """
    Serializer and deserializer of Inference Jobs

    Print an InferenceJobSerializer to see its details
    """

    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    model = serializers.PrimaryKeyRelatedField(queryset=InferenceModel.objects.all())

    class Meta:
        model = InferenceJob
        fields = ["id", "user", "model", "created_at", "updated_at"]
