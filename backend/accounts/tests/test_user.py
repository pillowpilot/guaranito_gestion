from django.contrib.auth import get_user_model
from django.test import TestCase


class TestUserModel(TestCase):
    def test_can_create_new_user(self):
        User = get_user_model()
        user = User.objects.create_user(email="user@google.com", password="strong")
        self.assertEqual(user.email, "user@google.com")
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)

    def test_email_and_password_required(self):
        User = get_user_model()
        with self.assertRaises(TypeError):
            User.objects.create_user()
        with self.assertRaises(TypeError):
            User.objects.create_user(email="user@google.com")
        with self.assertRaises(TypeError):
            User.objects.create_user(password="strong")

    def test_email_is_not_empty(self):
        User = get_user_model()
        with self.assertRaises(ValueError):
            User.objects.create_user(email="", password="strong")

    def test_can_create_new_superuser(self):
        User = get_user_model()
        user = User.objects.create_superuser(email="admin@admin.com", password="admin")
        self.assertEqual(user.email, "admin@admin.com")
        self.assertTrue(user.is_active)
        self.assertTrue(user.is_staff)
        self.assertTrue(user.is_superuser)

        with self.assertRaises(ValueError):
            User.objects.create_superuser(
                email="admin@admin.com", password="admin", is_superuser=False
            )

    def test_can_create_company_manager(self):
        User = get_user_model()
        user = User.objects.create_company_manager(
            email="manager@company.com", password="strong"
        )
        self.assertEqual(len(user.groups.filter(name="company_manager")), 1)

    def test_can_create_company_user(self):
        User = get_user_model()
        user = User.objects.create_company_user(
            email="user@company.com", password="strong"
        )
        self.assertEqual(len(user.groups.filter(name="company_user")), 1)
