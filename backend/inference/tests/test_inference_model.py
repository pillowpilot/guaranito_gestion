from django.test import TestCase
from inference.models import InferenceModel


class TestInferenceModel(TestCase):
    def test_create_model(self):
        m = InferenceModel.objects.create(
            name="leafs", display_name="Leafs Inference Model"
        )

        self.assertEqual(m.name, "leafs")
        self.assertEqual(m.display_name, "Leafs Inference Model")

        m.name = "fruits"
        m.display_name = "Fruits Model"
        m.save()

        self.assertEqual(m.name, "fruits")
        self.assertEqual(m.display_name, "Fruits Model")
