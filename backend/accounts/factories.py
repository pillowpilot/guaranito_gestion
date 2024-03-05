import factory
from accounts.models import Company, User


class CompanyFactory(factory.django.DjangoModelFactory):
    """
    Factory for companies with fake data.

    Use .create() for single instance and save to db.
    Again .create_batch(10) for multiple instances and save them.

    User .build() for single local instance
    and .build_batch(10) for multiple local instances.
    """

    name = factory.Faker("company")

    class Meta:
        model = Company


class UserFactory(factory.django.DjangoModelFactory):
    """
    Factory for users with fake data

    Use .build(), .build_batch(10), .create() and .create_batch(10).
    The 'build' strategy only generates the instance, 'create' saves them.

    User UserFactory.build(company=CompanyFactory.build()) to build an user
    with company.
    """

    first_name = factory.Faker("first_name")
    last_name = factory.Faker("last_name")
    email = factory.Faker("email")

    class Meta:
        model = User
