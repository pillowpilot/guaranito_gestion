from django.test import TestCase
from django.core.management import call_command
from django.contrib.auth.models import Group, Permission


class TestCommand(TestCase):
    command_name = "create_default_groups"

    def test_company_manager_is_created(self):
        call_command(self.command_name)
        qs = Group.objects.filter(name="company_manager")
        self.assertEqual(len(qs), 1)

    def test_company_user_is_created(self):
        call_command(self.command_name)
        qs = Group.objects.filter(name="company_user")
        self.assertEqual(len(qs), 1)

    def test_command_is_idempotent(self):
        call_command(self.command_name)
        call_command(self.command_name)

        qs = Group.objects.filter(name="company_manager")
        self.assertEqual(len(qs), 1)

        qs = Group.objects.filter(name="company_user")
        self.assertEqual(len(qs), 1)

    def test_user_perms_not_to_company_user(self):
        call_command(self.command_name)
        g = Group.objects.get(name="company_user")

        codenames = ["view_user", "add_user", "change_user"]
        for codename in codenames:
            p = Permission.objects.get(codename=codename)
            self.assertFalse(p in g.permissions.all())

    def test_user_perms_to_company_manager(self):
        call_command(self.command_name)
        g = Group.objects.get(name="company_manager")

        codenames = ["view_user", "add_user", "change_user"]
        for codename in codenames:
            p = Permission.objects.get(codename=codename)
            self.assertTrue(p in g.permissions.all())

    def test_parcel_perms_to_company_manager(self):
        call_command(self.command_name)
        g = Group.objects.get(name="company_manager")

        codenames = ["view_parcel", "add_parcel", "change_parcel"]
        for codename in codenames:
            p = Permission.objects.get(codename=codename)
            self.assertTrue(p in g.permissions.all())

    def test_parcel_perms_to_company_user(self):
        call_command(self.command_name)
        g = Group.objects.get(name="company_user")

        codenames = ["view_parcel", "add_parcel", "change_parcel", "delete_parcel"]
        for codename in codenames:
            p = Permission.objects.get(codename=codename)
            self.assertTrue(p in g.permissions.all())

    def test_inference_job_perms_to_company_manager(self):
        call_command(self.command_name)
        g = Group.objects.get(name="company_manager")

        codenames = ["view_inferencejob", "add_inferencejob"]
        for codename in codenames:
            p = Permission.objects.get(codename=codename)
            self.assertTrue(p in g.permissions.all())
