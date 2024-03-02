from django.core.management import call_command
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from accounts.models import User
from accounts.factories import UserFactory, CompanyFactory


class TestUserViewset(APITestCase):
    def setUp(self):
        call_command("create_default_groups")

    def test_unauthenticated_request_to_user_list(self):
        url = reverse("user-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_unauthenticated_request_to_user_detail(self):
        url = reverse("user-detail", kwargs={"pk": 1})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_list_users_by_company_manager(self):
        c = CompanyFactory.create(name="Google")
        UserFactory.create_batch(11, company=c)

        User.objects.create_company_manager(email="m@c", password="strong", company=c)

        token_url = reverse("token_obtain_pair")
        response = self.client.post(
            token_url, data={"email": "m@c", "password": "strong"}
        )
        token = response.data["access"]

        url = reverse("user-list")
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data["results"]), 11 + 1)

    def test_not_list_by_company_user(self):
        c = CompanyFactory.create(name="Google")
        UserFactory.create_batch(11, company=c)

        User.objects.create_company_user(email="m@c", password="strong", company=c)

        token_url = reverse("token_obtain_pair")
        response = self.client.post(
            token_url, data={"email": "m@c", "password": "strong"}
        )
        token = response.data["access"]

        url = reverse("user-list")
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_company_user_view_own_data(self):
        c = CompanyFactory.create(name="Google")
        UserFactory.create_batch(11, company=c)

        user = User.objects.create_company_user(
            email="m@c", password="strong", company=c
        )

        token_url = reverse("token_obtain_pair")
        response = self.client.post(
            token_url, data={"email": "m@c", "password": "strong"}
        )
        token = response.data["access"]

        url = reverse("user-detail", kwargs={"pk": user.id})
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_deny_user_creation_by_company_user(self):
        c = CompanyFactory.create()

        user = User.objects.create_company_user(
            email="u@c", password="strong", company=c
        )

        token_url = reverse("token_obtain_pair")
        response = self.client.post(
            token_url, data={"email": "u@c", "password": "strong"}
        )
        token = response.data["access"]

        data = {
            "first_name": "Morgan",
            "last_name": "Freeman",
            "email": "user@c.com",
            "password": "fastest",
            "company": c.id,
        }

        url = reverse("user-list")
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


    def test_create_company_user(self):
        c = CompanyFactory.create()

        user = User.objects.create_company_manager(
            email="m@c", password="strong", company=c
        )

        token_url = reverse("token_obtain_pair")
        response = self.client.post(
            token_url, data={"email": "m@c", "password": "strong"}
        )
        token = response.data["access"]

        data = {
            "first_name": "Morgan",
            "last_name": "Freeman",
            "email": "user@c.com",
            "password": "fastest",
            "company": c.id,
        }

        url = reverse("user-list")
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_company_user_wrong_company(self):
        google = CompanyFactory.create()
        oracle = CompanyFactory.create()

        manager = User.objects.create_company_manager(
            email="m@g.com", password="strong", company=google
        )

        token_url = reverse("token_obtain_pair")
        response = self.client.post(
            token_url, data={"email": "m@g.com", "password": "strong"}
        )
        token = response.data["access"]

        data = {
            "first_name": "Morgan",
            "last_name": "Freeman",
            "email": "user@g.com",
            "password": "fastest",
            "company": oracle.id,
        }

        url = reverse("user-list")
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
