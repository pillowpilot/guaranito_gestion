from django.core.management.base import BaseCommand
from deepforest import main


class Command(BaseCommand):
    help = "Download the lastest Deepforest model"

    def handle(self, *args, **kwargs):
        tree_counting_model = main.deepforest()
        tree_counting_model.use_release(check_release=True)
        return None
