from django.core.management import call_command
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from accounts.factories import CompanyFactory
from accounts.models import User
from inference.factories import InferenceModelFactory
from inference.models import InferenceModel


class TestInferenceModelViewset(APITestCase):
    def test_unauthenticated_request_to_list(self):
        url = reverse("inferencemodel-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_unauthenticated_request_to_detail(self):
        url = reverse("inferencemodel-detail", kwargs={"pk": 1})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_list_inference_model_by_company_manager(self):
        c = CompanyFactory.create()
        InferenceModelFactory.create_batch(10)

        m = User.objects.create_company_manager(
            email="m@c", password="strong", company=c
        )

        token_url = reverse("token_obtain_pair")
        response = self.client.post(
            token_url, data={"email": "m@c", "password": "strong"}
        )
        token = response.data["access"]

        url = reverse("inferencemodel-list")
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data["results"]), 10)

    def test_list_inference_model_by_company_user(self):
        c = CompanyFactory.create()
        InferenceModelFactory.create_batch(10)

        u = User.objects.create_company_user(email="u@c", password="strong", company=c)

        token_url = reverse("token_obtain_pair")
        response = self.client.post(
            token_url, data={"email": "u@c", "password": "strong"}
        )
        token = response.data["access"]

        url = reverse("inferencemodel-list")
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data["results"]), 10)

    def test_detail_inference_model_by_company_manager(self):
        c = CompanyFactory.create()
        InferenceModelFactory.create_batch(10)

        m = User.objects.create_company_manager(
            email="m@c", password="strong", company=c
        )

        token_url = reverse("token_obtain_pair")
        response = self.client.post(
            token_url, data={"email": "m@c", "password": "strong"}
        )
        token = response.data["access"]

        url = reverse("inferencemodel-detail", kwargs={"pk": 2})
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["id"], 2)
        self.assertEqual(response.data["name"], InferenceModel.objects.get(id=2).name)

    def test_detail_inference_model_by_company_user(self):
        c = CompanyFactory.create()
        InferenceModelFactory.create_batch(10)

        u = User.objects.create_company_user(email="u@c", password="strong", company=c)

        token_url = reverse("token_obtain_pair")
        response = self.client.post(
            token_url, data={"email": "u@c", "password": "strong"}
        )
        token = response.data["access"]

        url = reverse("inferencemodel-detail", kwargs={"pk": 2})
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["id"], 2)
        self.assertEqual(response.data["name"], InferenceModel.objects.get(id=2).name)
