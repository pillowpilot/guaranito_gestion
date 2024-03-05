from datetime import datetime, timedelta
from django.test import TestCase
from management.models import Lot
from management.factories import ParcelFactory, LotFactory


class TestLot(TestCase):
    def test_create_lot(self):
        p = ParcelFactory.create()
        lot = Lot.objects.create(name="A name", parcel=p)

        self.assertEqual(lot.name, "A name")
        self.assertEqual(lot.parcel, p)
        # By default, is_active must be true
        self.assertTrue(lot.is_active)
        # created_at and updated_at must be atleast really close
        self.assertTrue(lot.created_at - lot.updated_at < timedelta(seconds=1))
        self.assertTrue(
            lot.created_at - datetime.now(lot.created_at.tzinfo) < timedelta(seconds=1)
        )

        lot.name = "another name"
        lot.save()

        self.assertEqual(lot.name, "another name")

    def test_lot_factory(self):
        l = LotFactory.create()
        self.assertTrue(l.name)
        self.assertTrue(l.parcel)
