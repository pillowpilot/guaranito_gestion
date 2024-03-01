from django.test import TestCase
from accounts.models import Company


class TestUserModel(TestCase):
    def test_create_company(self):
        company = Company.objects.create(name="Company A")
        self.assertEqual(company.name, "Company A")
