from django.core.management import call_command
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from accounts.factories import CompanyFactory, UserFactory
from accounts.models import User
from inference.factories import InferenceJobFactory, InferenceModelFactory
from inference.models import InferenceJob

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

        m = User.objects.create_company_user(email="m@c", password="strong", company=c)

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

    def test_create_job_from_different_company(self):
        m = InferenceModelFactory.create()
        c1 = CompanyFactory.create()
        c2 = CompanyFactory.create()

        u1 = User.objects.create_company_manager(
            email="m@c1", password="strong", company=c1
        )
        u2 = User.objects.create_company_manager(
            email="m@c2", password="strong", company=c2
        )

        token_url = reverse("token_obtain_pair")
        response = self.client.post(
            token_url, data={"email": "m@c1", "password": "strong"}
        )
        token = response.data["access"]

        url = reverse("inferencejob-list")
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        data = {
            "user": u2.id,
            "model": m.id,
        }
        response = self.client.post(url, data=data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_job_as_another_user(self):
        m = InferenceModelFactory.create()
        c = CompanyFactory.create()

        u1 = User.objects.create_company_manager(
            email="u1@c", password="strong", company=c
        )
        u2 = User.objects.create_company_manager(
            email="u2@c", password="strong", company=c
        )

        token_url = reverse("token_obtain_pair")
        response = self.client.post(
            token_url, data={"email": "u1@c", "password": "strong"}
        )
        token = response.data["access"]

        url = reverse("inferencejob-list")
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        data = {
            "user": u2.id,
            "model": m.id,
        }
        response = self.client.post(url, data=data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_perform_logical_drop(self):
        c = CompanyFactory.create()
        ju = UserFactory.create(company=c)
        j = InferenceJobFactory.create(user=ju)

        u = User.objects.create_company_user(email="u@c", password="strong", company=c)

        token_url = reverse("token_obtain_pair")
        response = self.client.post(
            token_url, data={"email": "u@c", "password": "strong"}
        )
        token = response.data["access"]

        url = reverse("inferencejob-detail", kwargs={"pk": j.id})
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(InferenceJob.objects.get(id=j.id).is_active, False)
