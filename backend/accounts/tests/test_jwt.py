from rest_framework.test import APITestCase
from django.urls import reverse
from accounts.models import User
from accounts.factories import CompanyFactory


class TestJWT(APITestCase):
    def test_token_creation_success(self):
        c = CompanyFactory.create()
        User.objects.create_company_manager(email="m@c", password="strong", company=c)

        url = reverse("token_obtain_pair")
        data = {"email": "m@c", "password": "strong"}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 200)
        self.assertTrue("access" in response.data.keys())
        self.assertTrue("refresh" in response.data.keys())

    def test_token_creation_fail(self):
        c = CompanyFactory.create()
        User.objects.create_company_manager(email="m@c", password="strong", company=c)

        url = reverse("token_obtain_pair")
        data = {"email": "m@c", "password": "weak"}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 401)
