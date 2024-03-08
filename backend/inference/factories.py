import factory
from inference.models import InferenceModel


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
