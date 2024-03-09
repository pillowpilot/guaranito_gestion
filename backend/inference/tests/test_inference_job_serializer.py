from django.test import TestCase
from accounts.factories import UserFactory
from inference.factories import InferenceJobFactory, InferenceModelFactory
from inference.serializers import InferenceJobSerializer


class TestInferenceJobSerializer(TestCase):
    def test_serialize_job(self):
        job = InferenceJobFactory.create()

        serializer = InferenceJobSerializer(job)
        data = serializer.data

        fields = ["id", "user", "model", "created_at", "updated_at"]

        self.assertEqual(len(fields), len(data.keys()))
        for field in fields:
            self.assertTrue(field in data.keys())

        self.assertEqual(data["id"], job.id)
        self.assertEqual(data["user"], job.user.id)
        self.assertEqual(data["model"], job.model.id)

    def test_deserialize_job(self):
        u = UserFactory.create()
        m = InferenceModelFactory.create()
        native = {"id": 1, "user": u.id, "model": m.id}

        serializer = InferenceJobSerializer(data=native)
        self.assertTrue(serializer.is_valid())

    def test_deserialize_job_with_incorrect_user(self):
        m = InferenceModelFactory.create()
        native = {"id": 1, "user": 99, "model": m.id}

        serializer = InferenceJobSerializer(data=native)
        self.assertFalse(serializer.is_valid())
        self.assertEqual("does_not_exist", serializer.errors["user"][0].code)

    def test_deserialize_job_with_incorrect_model(self):
        u = UserFactory.create()
        native = {"id": 1, "user": u.id, "model": 99}

        serializer = InferenceJobSerializer(data=native)
        self.assertFalse(serializer.is_valid())
        self.assertEqual("does_not_exist", serializer.errors["model"][0].code)
