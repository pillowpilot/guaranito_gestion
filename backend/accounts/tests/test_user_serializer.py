from django.contrib.auth import get_user_model
from django.test import TestCase
from accounts.models import Company
from accounts.serializers import UserSerializer
from accounts.factories import CompanyFactory


class TestUserSerializer(TestCase):
    def test_serialize_user(self):
        User = get_user_model()
        first_name = "Freddy"
        last_name = "Mercury"
        email = "user@company.com"
        user = User.objects._create_user(
            first_name=first_name, last_name=last_name, email=email, password="password"
        )
        data = UserSerializer(user).data

        fields = ["id", "email", "first_name", "last_name", "company"]

        # Test there is a one-to-one correspondence between fields and keys
        self.assertEqual(len(fields), len(data.keys()))
        for field in fields:
            self.assertTrue(field in data.keys())

        self.assertEqual(data["email"], email)
        self.assertEqual(data["first_name"], first_name)
        self.assertEqual(data["last_name"], last_name)
        self.assertEqual(data["company"], None)

    def test_serializer_user_with_company(self):
        company = Company.objects.create(name="Company A")

        User = get_user_model()
        first_name = "Freddy"
        last_name = "Mercury"
        email = "user@company.com"
        user = User.objects.create_company_manager(
            first_name=first_name,
            last_name=last_name,
            email=email,
            password="password",
            company=company,
        )
        data = UserSerializer(user).data

        fields = ["id", "email", "first_name", "last_name", "company"]

        # Test there is a one-to-one correspondence between fields and keys
        self.assertEqual(len(fields), len(data.keys()))
        for field in fields:
            self.assertTrue(field in data.keys())

        self.assertEqual(data["email"], email)
        self.assertEqual(data["first_name"], first_name)
        self.assertEqual(data["last_name"], last_name)
        self.assertEqual(data["company"], company.id)

    def test_deserialize_user(self):
        c = CompanyFactory.create()
        native = {
            "id": 1,
            "email": "user@company.com",
            "first_name": "Freddy",
            "last_name": "Mercury",
            "password": "iwanttobreakfree",
            "company": c.id,
        }

        serializer = UserSerializer(data=native)
        self.assertTrue(serializer.is_valid())

    def test_deserialize_user_with_incorrect_company(self):
        native = {
            "id": 1,
            "email": "user@company.com",
            "first_name": "Freddy",
            "last_name": "Mercury",
            "password": "iwanttobreakfree",
            "company": 1,
        }

        serializer = UserSerializer(data=native)
        self.assertFalse(serializer.is_valid())
        self.assertTrue("company" in serializer.errors.keys())

    def test_deserialize_user_with_company(self):
        c = Company.objects.create(name="Company Z")

        native = {
            "id": 1,
            "email": "user@company.com",
            "first_name": "Freddy",
            "last_name": "Mercury",
            "password": "iwanttobreakfree",
            "company": c.id,
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
        self.assertTrue(serializer.errors["password"])

    def test_email_required_on_deserialization(self):
        native = {
            "id": 1,
            "first_name": "Freddy",
            "last_name": "Mercury",
            "password": "iwanttobreakfree",
        }

        serializer = UserSerializer(data=native)
        serializer.is_valid()
        self.assertTrue(serializer.errors["email"])

    def test_id_not_required_on_deserialization(self):
        native = {
            "email": "user@company.com",
            "first_name": "Freddy",
            "last_name": "Mercury",
            "password": "iwanttobreakfree",
        }

        serializer = UserSerializer(data=native)
        serializer.is_valid()
        self.assertFalse("id" in serializer.errors.keys())

    def test_first_name_and_last_name_not_required_on_deserialization(self):
        native = {"email": "user@company.com", "password": "iwanttobreakfree"}

        serializer = UserSerializer(data=native)
        serializer.is_valid()
        self.assertFalse("first_name" in serializer.errors.keys())
        self.assertFalse("last_name" in serializer.errors.keys())

    def test_type_error_on_company_field(self):
        native = {
            "email": "user@company.com",
            "first_name": "Freddy",
            "last_name": "Mercury",
            "password": "iwanttobreakfree",
            "company": "asdf",
        }

        serializer = UserSerializer(data=native)
        self.assertFalse(serializer.is_valid())
        self.assertTrue("company" in serializer.errors.keys())
        self.assertEqual(serializer.errors["company"][0].code, "incorrect_type")
