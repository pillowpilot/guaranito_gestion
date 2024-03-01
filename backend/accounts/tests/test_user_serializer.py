from django.contrib.auth import get_user_model
from django.test import TestCase
from accounts.serializers import UserSerializer


class TestUserSerializer(TestCase):
    def test_serialize_user(self):
        User = get_user_model()
        first_name = "Freddy"
        last_name = "Mercury"
        email = "user@company.com"
        user = User.objects.create_user(
            first_name=first_name, last_name=last_name, email=email, password="password"
        )
        data = UserSerializer(user).data

        fields = [
            "id",
            "email",
            "first_name",
            "last_name",
        ]
        # Test there is a one-to-one correspondence between fields and keys
        self.assertEqual(len(fields), len(data.keys()))
        for field in fields:
            self.assertTrue(field in data.keys())

        self.assertEqual(data["email"], email)
        self.assertEqual(data["first_name"], first_name)
        self.assertEqual(data["last_name"], last_name)

    def test_deserialize_user(self):
        native = {
            "id": 1,
            "email": "user@company.com",
            "first_name": "Freddy",
            "last_name": "Mercury",
            "password": "iwanttobreakfree"
        }

        serializer = UserSerializer(data=native)
        self.assertTrue(serializer.is_valid())

    def test_password_required_on_deserialization(self):
        native = {
            "id": 1,
            "email": "user@company.com",
            "first_name": "Freddy",
            "last_name": "Mercury",
        }

        serializer = UserSerializer(data=native)
        serializer.is_valid()
        self.assertTrue(serializer.errors['password'])

    def test_email_required_on_deserialization(self):
        native = {
            "id": 1,
            "first_name": "Freddy",
            "last_name": "Mercury",
            "password": "iwanttobreakfree"
        }

        serializer = UserSerializer(data=native)
        serializer.is_valid()
        self.assertTrue(serializer.errors['email'])

    def test_id_not_required_on_deserialization(self):
        native = {
            "email": "user@company.com",
            "first_name": "Freddy",
            "last_name": "Mercury",
            "password": "iwanttobreakfree"
        }

        serializer = UserSerializer(data=native)
        serializer.is_valid()
        self.assertFalse('id' in serializer.errors.keys())

    def test_first_name_and_last_name_not_required_on_deserialization(self):
        native = {
            "email": "user@company.com",
            "password": "iwanttobreakfree"
        }

        serializer = UserSerializer(data=native)
        serializer.is_valid()
        self.assertFalse('first_name' in serializer.errors.keys())
        self.assertFalse('last_name' in serializer.errors.keys())
