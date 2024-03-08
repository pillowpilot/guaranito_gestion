from django.test import TestCase
from accounts.models import User
from accounts.factories import CompanyFactory
from inference.models import InferenceJob
from inference.factories import InferenceModelFactory


class TestInferenceJob(TestCase):
    def test_create_model(self):
        c = CompanyFactory.create()
        u = User.objects.create_company_user(email="m@c", password="pass", company=c)
        m = InferenceModelFactory.create()
        j = InferenceJob.objects.create(user=u, model=m)

        self.assertEqual(j.user, u)
        self.assertEqual(j.model, m)
        self.assertEqual(j.is_active, True)
