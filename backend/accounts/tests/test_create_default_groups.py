from django.test import TestCase
from django.core.management import call_command
from django.contrib.auth.models import Group


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
