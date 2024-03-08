from django.test import TestCase
from inference.factories import InferenceModelFactory
from inference.serializers import InferenceModelSerializer


class TestInferenceModelSerializer(TestCase):
    def test_serialize_model(self):
        m = InferenceModelFactory.create()

        serializer = InferenceModelSerializer(m)

        self.assertEqual(len(serializer.data.keys()), 4)
        self.assertTrue("id" in serializer.data.keys())
        self.assertTrue("name" in serializer.data.keys())
        self.assertTrue("created_at" in serializer.data.keys())
        self.assertTrue("updated_at" in serializer.data.keys())
