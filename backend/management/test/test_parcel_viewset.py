from django.core.management import call_command
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from accounts.models import User
from accounts.factories import CompanyFactory
from management.models import Parcel
from management.factories import ParcelFactory


class TestParcelViewset(APITestCase):
    def setUp(self):
        call_command("create_default_groups")

    def test_unauthenticated_request_to_parcel_list(self):
        url = reverse("parcel-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_unauthenticated_request_to_parcel_detail(self):
        url = reverse("parcel-detail", kwargs={"pk": 1})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_list_parcels_by_company_manager(self):
        c = CompanyFactory.create()
        ParcelFactory.create_batch(10, company=c)

        m = User.objects.create_company_manager(
            email="m@c", password="strong", company=c
        )

        token_url = reverse("token_obtain_pair")
        response = self.client.post(
            token_url, data={"email": "m@c", "password": "strong"}
        )
        token = response.data["access"]

        url = reverse("parcel-list")
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data["results"]), 10)

    def test_list_parcels_by_company_user(self):
        c = CompanyFactory.create()
        ParcelFactory.create_batch(11, company=c)

        m = User.objects.create_company_user(email="u@c", password="strong", company=c)

        token_url = reverse("token_obtain_pair")
        response = self.client.post(
            token_url, data={"email": "u@c", "password": "strong"}
        )
        token = response.data["access"]

        url = reverse("parcel-list")
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data["results"]), 11)

    def test_create_parcel_by_company_manager(self):
        c = CompanyFactory.create()

        m = User.objects.create_company_manager(
            email="m@c", password="strong", company=c
        )

        token_url = reverse("token_obtain_pair")
        response = self.client.post(
            token_url, data={"email": "m@c", "password": "strong"}
        )
        token = response.data["access"]

        url = reverse("parcel-list")
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        response = self.client.post(url, data={"name": "new parcel", "company": c.id})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["name"], "new parcel")
        self.assertEqual(response.data["company"], c.id)

    def test_create_parcel_by_company_user(self):
        c = CompanyFactory.create()

        m = User.objects.create_company_user(email="u@c", password="strong", company=c)

        token_url = reverse("token_obtain_pair")
        response = self.client.post(
            token_url, data={"email": "u@c", "password": "strong"}
        )
        token = response.data["access"]

        url = reverse("parcel-list")
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        response = self.client.post(url, data={"name": "new parcel 2", "company": c.id})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["name"], "new parcel 2")
        self.assertEqual(response.data["company"], c.id)

    def test_logical_drop_parcel(self):
        c = CompanyFactory.create()
        m = User.objects.create_company_user(email="u@c", password="strong", company=c)
        p = ParcelFactory.create(company=c)

        token_url = reverse("token_obtain_pair")
        response = self.client.post(
            token_url, data={"email": "u@c", "password": "strong"}
        )
        token = response.data["access"]

        url = reverse("parcel-detail", kwargs={"pk": p.id})
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Parcel.objects.get(id=p.id).is_active, False)
