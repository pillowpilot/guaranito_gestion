from django.test import TestCase
from accounts.factories import CompanyFactory
from management.factories import LotFactory, ParcelFactory
from management.serializers import LotSerializer

from pprint import pprint


class TestLotSerializer(TestCase):
    def test_serialize_lot(self):
        l = LotFactory.create()

        serializer = LotSerializer(l)
        
        self.assertEqual(len(serializer.data.keys()), 7)
        self.assertTrue("id" in serializer.data.keys())
        self.assertTrue("name" in serializer.data.keys())
        self.assertTrue("parcel" in serializer.data.keys())
        self.assertTrue("parcel_name" in serializer.data.keys())
        self.assertEqual(serializer.data["parcel_name"], l.parcel.name)
        self.assertTrue("geodata" in serializer.data.keys())
        self.assertTrue("created_at" in serializer.data.keys())
        self.assertTrue("updated_at" in serializer.data.keys())

    def test_deserialize_lot(self):
        p = ParcelFactory.create()
        native = {
            "id": 1,
            "name": "lots of lots",
            "parcel": p.id,
        }

        serializer = LotSerializer(data=native)
        self.assertTrue(serializer.is_valid())
        self.assertTrue(serializer.data["name"], "lots of lots")
        self.assertTrue(serializer.data["parcel"], p.id)

    def test_deserialize_lot_with_invalid_parcel(self):
        native = {
            "id": 1,
            "name": "name1",
            "parcel": 999,
        }

        serializer = LotSerializer(data=native)
        self.assertFalse(serializer.is_valid())
        self.assertTrue("parcel" in serializer.errors.keys())
        self.assertEqual("does_not_exist", serializer.errors["parcel"][0].code)

    def test_deserialize_lot_without_name(self):
        p = ParcelFactory.create()
        native = {"id": 1, "parcel": p.id}

        serializer = LotSerializer(data=native)
        self.assertFalse(serializer.is_valid())
        self.assertTrue("name" in serializer.errors.keys())
        self.assertEqual("required", serializer.errors["name"][0].code)

    def test_deserialize_lot_without_parcel(self):
        native = {"id": 1, "name": "lots of lots"}

        serializer = LotSerializer(data=native)
        self.assertFalse(serializer.is_valid())
        self.assertTrue("parcel" in serializer.errors.keys())
        self.assertEqual("required", serializer.errors["parcel"][0].code)

    def test_deserialize_lot_with_empty_name(self):
        p = ParcelFactory.create()
        native = {"id": 1, "name": "", "parcel": p.id}

        serializer = LotSerializer(data=native)
        self.assertFalse(serializer.is_valid())
        self.assertTrue("name" in serializer.errors.keys())
        self.assertEqual("blank", serializer.errors["name"][0].code)
