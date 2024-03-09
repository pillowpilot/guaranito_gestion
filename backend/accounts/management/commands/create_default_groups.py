from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group, Permission


class Command(BaseCommand):
    help = "Initialize groups with company_manager and company_user"

    def handle(self, *args, **kwargs):
        company_user, created = Group.objects.get_or_create(name="company_user")
        company_manager, created = Group.objects.get_or_create(name="company_manager")

        user_related_codenames = ["view_user", "add_user", "change_user"]
        parcel_related_codenames = [
            "view_parcel",
            "add_parcel",
            "change_parcel",
            "delete_parcel",
        ]
        inference_job_related_codenames = [
            "view_inferencejob",
            "add_inferencejob",
            "delete_inferencejob",
        ]
        lot_related_codenames = ["view_lot", "add_lot", "change_lot", "delete_lot"]
        try:
            for codename in user_related_codenames:
                perm = Permission.objects.get(codename=codename)
                company_manager.permissions.add(perm)

            for codename in parcel_related_codenames:
                perm = Permission.objects.get(codename=codename)
                company_manager.permissions.add(perm)
                company_user.permissions.add(perm)

            for codename in inference_job_related_codenames:
                perm = Permission.objects.get(codename=codename)
                company_manager.permissions.add(perm)
                company_user.permissions.add(perm)

            for codename in lot_related_codenames:
                perm = Permission.objects.get(codename=codename)
                company_manager.permissions.add(perm)
                company_user.permissions.add(perm)

        except Permission.DoesNotExist:
            self.stderr.write(f"Permission with codename {codename} does not exists")
        return None
