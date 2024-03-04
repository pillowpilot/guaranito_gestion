from rest_framework import serializers
from accounts.models import User, Company

class UserSerializer(serializers.ModelSerializer):
    """
    Serialize and deserialize using the User model as spec

    To get an User instance use .save()
    Only the email and password fields are required on deserialization

    Print an UserSerializer instance to see its details
    """
    password = serializers.CharField(write_only=True)
    company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all())

    class Meta(object):
        model = User
        fields = (
            "id",
            "email",
            "first_name",
            "last_name",
            "company",
            "password",
        )

    def create(self, validated_data):
        user = User.objects.create_company_user(**validated_data)
        return user

    def update(self, instance, validated_data):
        user = super().update(instance, validated_data)
        if "password" in validated_data:
            user.set_password(validated_data["password"])
            user.save()
        return user
