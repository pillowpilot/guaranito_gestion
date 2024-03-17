from rest_framework import serializers
from accounts.models import Company
from management.models import Parcel, Lot


class ParcelSerializer(serializers.ModelSerializer):
    """
    Serialization and deserialization for the Parcel model

    Print an ParcelSerializer instance to see its details
    """

    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all())
    geodata = serializers.FileField(use_url=False)

    class Meta(object):
        model = Parcel
        fields = (
            "id",
            "name",
            "company",
            "geodata",
            "created_at",
            "updated_at",
        )


class LotSerializer(serializers.ModelSerializer):
    """
    Serialization and deserialization for the Lot model

    Print an ParcelSerializer instance to see its details
    """

    parcel = serializers.PrimaryKeyRelatedField(queryset=Parcel.objects.all())
    parcel_name = serializers.CharField(source="parcel.name", read_only=True)
    geodata = serializers.FileField(use_url=False, required=False)

    class Meta(object):
        model = Lot
        fields = (
            "id",
            "name",
            "parcel",
            "parcel_name",
            "geodata",
            "created_at",
            "updated_at",
        )
