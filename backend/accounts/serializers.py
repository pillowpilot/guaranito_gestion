from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from accounts.models import User, Company


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Custom JWT Token Obtain Serializer that appends user id to response
    and into token
    """

    @classmethod
    def get_token(cls, user):
        """Override get_token to append user id to token"""
        token = super().get_token(user)
        token["id"] = user.id
        return token

    def validate(self, attrs):
        """Add user id into response data after validation"""
        response_data = super().validate(attrs)
        response_data["id"] = self.user.id
        return response_data


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
