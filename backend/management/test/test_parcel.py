from datetime import datetime, timedelta
from django.test import TestCase
from accounts.factories import CompanyFactory
from management.models import Parcel
from management.factories import ParcelFactory


class TestParcel(TestCase):
    def test_create_parcel(self):
        c = CompanyFactory.create()

        data = {"name": "A name"}
        parcel = Parcel.objects.create(name=data["name"], company=c)
        self.assertEqual(parcel.name, data["name"])
        self.assertEqual(parcel.company, c)
        # By default, is_active must be true
        self.assertTrue(parcel.is_active)
        # created_at and updated_at must be atleast really close
        self.assertTrue(parcel.created_at - parcel.updated_at < timedelta(seconds=1))
        self.assertTrue(
            parcel.created_at - datetime.now(parcel.created_at.tzinfo)
            < timedelta(seconds=1)
        )

        parcel.name = "A new name"
        parcel.save()
        self.assertEqual(parcel.name, "A new name")

    def test_parcel_factory(self):
        p = ParcelFactory.create()
        self.assertTrue(p.name)
        self.assertTrue(p.company)
