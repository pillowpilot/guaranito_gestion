from django.test import TestCase
from django.core.management import call_command
from inference.models import InferenceModel


class TestCommand(TestCase):
    command_name = "create_default_inference_models"

    def test_leafs_model_is_created(self):
        call_command(self.command_name)
        qs = InferenceModel.objects.filter(name="leafs")
        self.assertEqual(len(qs), 1)

    def test_fruits_model_is_created(self):
        call_command(self.command_name)
        qs = InferenceModel.objects.filter(name="fruits")
        self.assertEqual(len(qs), 1)

    def test_trees_model_is_created(self):
        call_command(self.command_name)
        qs = InferenceModel.objects.filter(name="trees")
        self.assertEqual(len(qs), 1)

    def test_only_tree_models_created(self):
        call_command(self.command_name)
        qs = InferenceModel.objects.all()
        self.assertEqual(len(qs), 3)
