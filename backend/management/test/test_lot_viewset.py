from django.core.management import call_command
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from accounts.models import User
from accounts.factories import CompanyFactory
from management.models import Lot
from management.factories import LotFactory, ParcelFactory


class TestLotViewset(APITestCase):
    def setUp(self):
        call_command("create_default_groups")

    def test_unauthenticated_request_to_lot_list(self):
        url = reverse("lot-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_unauthenticated_request_to_lot_detail(self):
        url = reverse("lot-detail", kwargs={"pk": 1})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_list_lots_by_company_user(self):
        c = CompanyFactory.create()
        p = ParcelFactory.create(company=c)
        LotFactory.create_batch(10, parcel=p)

        u = User.objects.create_company_user(email="u@c", password="strong", company=c)

        token_url = reverse("token_obtain_pair")
        response = self.client.post(
            token_url, data={"email": "u@c", "password": "strong"}
        )
        token = response.data["access"]

        url = reverse("lot-list")
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data["results"]), 10)

    def test_list_lots_by_company_manager(self):
        c = CompanyFactory.create()
        p = ParcelFactory.create(company=c)
        LotFactory.create_batch(10, parcel=p)

        m = User.objects.create_company_manager(
            email="m@c", password="strong", company=c
        )

        token_url = reverse("token_obtain_pair")
        response = self.client.post(
            token_url, data={"email": "m@c", "password": "strong"}
        )
        token = response.data["access"]

        url = reverse("lot-list")
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data["results"]), 10)

    def test_create_lot_by_company_user(self):
        c = CompanyFactory.create()
        p = ParcelFactory.create(company=c)

        u = User.objects.create_company_user(email="u@c", password="strong", company=c)

        token_url = reverse("token_obtain_pair")
        response = self.client.post(
            token_url, data={"email": "u@c", "password": "strong"}
        )
        token = response.data["access"]

        url = reverse("lot-list")
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        data = {
            "name": "lots of names",
            "parcel": p.id,
        }
        response = self.client.post(url, data=data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["name"], "lots of names")
        self.assertEqual(response.data["parcel"], p.id)

    def test_create_lot_by_another_company_user(self):
        c1 = CompanyFactory.create()
        c2 = CompanyFactory.create()
        p = ParcelFactory.create(company=c2)

        u1 = User.objects.create_company_manager(
            email="u1@c1", password="u1", company=c1
        )
        u2 = User.objects.create_company_manager(
            email="u2@c2", password="u2", company=c2
        )

        token_url = reverse("token_obtain_pair")
        response = self.client.post(
            token_url, data={"email": "u1@c1", "password": "u1"}
        )
        token = response.data["access"]

        url = reverse("lot-list")
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        data = {
            "name": "lots of names",
            "parcel": p.id,
        }
        response = self.client.post(url, data=data)
        self.assertTrue(False)  # TODO FIX THIS!

    def test_logical_drop_lot(self):
        c = CompanyFactory.create()
        p = ParcelFactory.create(company=c)
        l = LotFactory.create(parcel=p)

        u = User.objects.create_company_user(email="u@c", password="strong", company=c)

        token_url = reverse("token_obtain_pair")
        response = self.client.post(
            token_url, data={"email": "u@c", "password": "strong"}
        )
        token = response.data["access"]

        url = reverse("lot-detail", kwargs={"pk": l.id})
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Lot.objects.get(id=l.id).is_active, False)

    def test_lot_total(self):
        c = CompanyFactory.create()
        p = ParcelFactory.create(company=c)
        m = User.objects.create_company_user(email="u@c", password="strong", company=c)
        LotFactory.create_batch(101, parcel=p)

        # logically delete some of them
        ids = [11, 22, 30]
        for id in ids:
            Lot.objects.get(id=id).is_active = False

        token_url = reverse("token_obtain_pair")
        response = self.client.post(
            token_url, data={"email": "u@c", "password": "strong"}
        )
        token = response.data["access"]

        url = reverse("lot-total")
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            len(Lot.objects.filter(is_active=True)), response.data["total"]
        )
