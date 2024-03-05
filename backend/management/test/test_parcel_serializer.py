from django.test import TestCase
from accounts.factories import CompanyFactory
from management.factories import ParcelFactory
from management.serializers import ParcelSerializer


class TestParcelSerializer(TestCase):
    def test_serialize_parcel(self):
        p = ParcelFactory.create()

        serializer = ParcelSerializer(p)

        # Test there is a one-to-one correspondence between
        # fields and keys
        self.assertEqual(len(serializer.data.keys()), 5)
        self.assertTrue("id" in serializer.data.keys())
        self.assertTrue("name" in serializer.data.keys())
        self.assertTrue("company" in serializer.data.keys())
        self.assertTrue("created_at" in serializer.data.keys())
        self.assertTrue("updated_at" in serializer.data.keys())
        self.assertEqual(p.company.id, serializer.data["company"])

    def test_deserialize_parcel(self):
        c = CompanyFactory.create()
        native = {
            "id": 1,
            "name": "some name",
            "company": c.id,
        }

        serializer = ParcelSerializer(data=native)
        self.assertTrue(serializer.is_valid())
        self.assertEqual(serializer.data["name"], "some name")
        self.assertEqual(serializer.data["company"], c.id)

    def test_deserialize_parcel_with_invalid_company(self):
        native = {
            "id": 1,
            "name": "some name",
            "company": 999,
        }

        serializer = ParcelSerializer(data=native)
        self.assertFalse(serializer.is_valid())
        self.assertTrue("company" in serializer.errors.keys())
        self.assertEqual("does_not_exist", serializer.errors["company"][0].code)

    def test_deserialize_parcel_without_name(self):
        c = CompanyFactory.create()
        native = {"id": 1, "company": c.id}

        serializer = ParcelSerializer(data=native)
        self.assertFalse(serializer.is_valid())
        self.assertTrue("name" in serializer.errors.keys())
        self.assertEqual("required", serializer.errors["name"][0].code)

    def test_deserialize_parcel_without_company(self):
        native = {"id": 1, "name": "some name"}

        serializer = ParcelSerializer(data=native)
        self.assertFalse(serializer.is_valid())
        self.assertTrue("company" in serializer.errors.keys())
        self.assertEqual("required", serializer.errors["company"][0].code)

    def test_deserialize_parcel_with_empty_name(self):
        c = CompanyFactory.create()
        native = {"id": 1, "name": "", "company": c.id}

        serializer = ParcelSerializer(data=native)
        self.assertFalse(serializer.is_valid())
        self.assertTrue("name" in serializer.errors.keys())
        self.assertEqual("blank", serializer.errors["name"][0].code)
