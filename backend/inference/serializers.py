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
    user_email = serializers.CharField(source="user.email", read_only=True)
    # lot = serializers.PrimaryKeyRelatedField(queryset=Lot.objects.filter(...)) # TODO add filtering at queryset (this company only)
    lot_name = serializers.CharField(source="lot.name", read_only=True)
    model = serializers.PrimaryKeyRelatedField(queryset=InferenceModel.objects.all())
    model_codename = serializers.CharField(source="model.name", read_only=True)
    latitude = serializers.FloatField(read_only=True)
    longitude = serializers.FloatField(read_only=True)

    class Meta:
        model = InferenceJob
        fields = [
            "id",
            "user",
            "user_email",
            "lot",
            "lot_name",
            "model",
            "model_codename",
            "image",
            "latitude",
            "longitude",
            "created_at",
            "updated_at",
        ]
