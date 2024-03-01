from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group

class Command(BaseCommand):
    help = "Initialize groups with company_manager and company_user"

    def handle(self, *args, **kwargs):
        company_user = Group.objects.get_or_create(name="company_user")
        company_manager = Group.objects.get_or_create(name="company_manager")
        return None