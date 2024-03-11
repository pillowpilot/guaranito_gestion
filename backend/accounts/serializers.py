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
        # Add user id to token
        token["id"] = user.id
        # Add role to token
        qs = user.groups.filter(name="company_manager")
        if len(qs) > 0:
            token["role"] = "company_manager"
        else:
            token["role"] = "company_user"
        # Add company to token
        token["company"] = user.company.id
        return token

    def validate(self, attrs):
        """Add user id into response data after validation"""
        response_data = super().validate(attrs)
        # Add user id to response
        response_data["id"] = self.user.id
        # Add role to response
        qs = self.user.groups.filter(name="company_manager")
        if len(qs) > 0:
            response_data["role"] = "company_manager"
        else:
            response_data["role"] = "company_user"
        # Add company to response
        response_data["company"] = self.user.company.id
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
