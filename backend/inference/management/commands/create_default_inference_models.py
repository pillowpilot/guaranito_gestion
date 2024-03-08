from django.core.management.base import BaseCommand
from inference.models import InferenceModel


class Command(BaseCommand):
    help = "Initialize inference models with leafs diseases, fruits diseases and tree counting"

    def handle(self, *args, **kwargs):
        leafs = InferenceModel.objects.create(
            name="leafs", display_name="Leafs Diseases"
        )
        fruits = InferenceModel.objects.create(
            name="fruits", display_name="Fruits Diseases"
        )
        trees = InferenceModel.objects.create(
            name="trees", display_name="Tree Counting"
        )
        return None
