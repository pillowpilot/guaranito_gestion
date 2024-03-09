from django.core.management import call_command
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from accounts.factories import CompanyFactory, UserFactory
from accounts.models import User
from inference.factories import InferenceModelFactory, InferenceJobFactory
from inference.models import InferenceModel

from pprint import pprint


class TestInferenceModelViewset(APITestCase):
    def setUp(self) -> None:
        call_command("create_default_groups")

    def test_unauthenticated_request_to_list(self):
        url = reverse("inferencejob-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_unauthorized_request_to_detail(self):
        url = reverse("inferencejob-detail", kwargs={"pk": 1})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_list_jobs_by_company_manager(self):
        c = CompanyFactory.create()
        c2 = CompanyFactory.create()

        u = UserFactory.create(company=c)
        u2 = UserFactory.create(company=c2)

        InferenceJobFactory.create_batch(10, user=u)
        InferenceJobFactory.create_batch(10, user=u2)

        m = User.objects.create_company_manager(
            email="m@c", password="strong", company=c
        )

        token_url = reverse("token_obtain_pair")
        response = self.client.post(
            token_url, data={"email": "m@c", "password": "strong"}
        )
        token = response.data["access"]

        url = reverse("inferencejob-list")
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data["results"]
        self.assertEqual(len(results), 10)
        for result in results:
            qs = User.objects.filter(id=result["user"])
            self.assertTrue(len(qs), 1)
            u = qs[0]
            self.assertEqual(u.company.id, c.id)

    def test_list_jobs_by_company_user(self):
        c = CompanyFactory.create()
        c2 = CompanyFactory.create()

        u = UserFactory.create(company=c)
        u2 = UserFactory.create(company=c2)

        InferenceJobFactory.create_batch(10, user=u)
        InferenceJobFactory.create_batch(10, user=u2)

        m = User.objects.create_company_user(
            email="m@c", password="strong", company=c
        )

        token_url = reverse("token_obtain_pair")
        response = self.client.post(
            token_url, data={"email": "m@c", "password": "strong"}
        )
        token = response.data["access"]

        url = reverse("inferencejob-list")
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data["results"]
        self.assertEqual(len(results), 10)
        for result in results:
            qs = User.objects.filter(id=result["user"])
            self.assertTrue(len(qs), 1)
            u = qs[0]
            self.assertEqual(u.company.id, c.id)

        
