import logging
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import Group
from django.utils.translation import gettext_lazy as _

logger = logging.getLogger()


class UserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """

    def create_user(self, email, password, **extra_fields):
        """
        Create and save a user with the given email and password.
        """
        if not email:
            raise ValueError(_("The Email must be set"))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_company_manager(self, email, password, **extra_fields):
        """
        Create and save an user and add it to the company_manager group
        """
        user = self.create_user(email, password, **extra_fields)
        company_manager, created = Group.objects.get_or_create(name="company_manager")
        if created:
            logger.info(f"The group 'company_manager' did not exists and was created")
        user.groups.add(company_manager)
        return user

    def create_company_user(self, email, password, **extra_fields):
        """
        Create and save an user and add it to the company_user group
        """
        user = self.create_user(email, password, **extra_fields)
        company_user, created = Group.objects.get_or_create(name="company_user")
        if created:
            logger.info(f"The group 'company_user' did not exists and was created")
        user.groups.add(company_user)
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError(_("Superuser must have is_staff=True."))
        if extra_fields.get("is_superuser") is not True:
            raise ValueError(_("Superuser must have is_superuser=True."))
        return self.create_user(email, password, **extra_fields)
