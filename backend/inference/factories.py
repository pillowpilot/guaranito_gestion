import factory
from accounts.factories import UserFactory
from management.factories import LotFactory
from inference.models import InferenceModel, InferenceJob


class InferenceModelFactory(factory.django.DjangoModelFactory):
    """
    Factory for inference models with fake data.

    Use .create() for single instance and save to db.
    Again .create_batch(10) for multiple instances and save them.

    User .build() for single local instance
    and .build_batch(10) for multiple local instances.
    """

    name = factory.Faker("first_name")
    display_name = factory.Faker("name")

    class Meta:
        model = InferenceModel


class InferenceJobFactory(factory.django.DjangoModelFactory):
    """
    Factory for inference jobs with fake data.

    Use .create() for single instance and save to db.
    Again .create_batch(10) for multiple instances and save them.

    User .build() for single local instance
    and .build_batch(10) for multiple local instances.
    """

    user = factory.SubFactory(UserFactory)
    model = factory.SubFactory(InferenceModelFactory)
    lot = factory.SubFactory(LotFactory)
    latitude = factory.Faker('pyfloat')
    longitude = factory.Faker('pyfloat')
    # TODO Add factories for all other fields

    class Meta:
        model = InferenceJob
