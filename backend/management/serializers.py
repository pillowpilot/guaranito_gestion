from rest_framework import serializers
from accounts.models import Company
from management.models import Parcel, Lot


class ParcelSerializer(serializers.ModelSerializer):
    """
    Serialization and deserialization for the Parcel model

    Print an ParcelSerializer instance to see its details
    """

    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all())

    class Meta(object):
        model = Parcel
        fields = (
            "id",
            "name",
            "company",
            "created_at",
            "updated_at",
        )


class LotSerializer(serializers.ModelSerializer):
    """
    Serialization and deserialization for the Lot model

    Print an ParcelSerializer instance to see its details
    """

    parcel = serializers.PrimaryKeyRelatedField(queryset=Parcel.objects.all())

    class Meta(object):
        model = Lot
        fields = (
            "id",
            "name",
            "parcel",
            "created_at",
            "updated_at",
        )
