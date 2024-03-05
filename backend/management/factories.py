import factory
from accounts.factories import CompanyFactory
from management.models import Parcel, Lot


class ParcelFactory(factory.django.DjangoModelFactory):
    """
    Factory for parcels with fake data.

    Use .create() for single instance and save to db.
    Again .create_batch(10) for multiple instances and save them.

    User .build() for single local instance
    and .build_batch(10) for multiple local instances.
    """

    name = factory.Faker("sentence")
    company = factory.SubFactory(CompanyFactory)

    class Meta:
        model = Parcel


class LotFactory(factory.django.DjangoModelFactory):
    """
    Factory for lots with fake data.

    Use .create() for single instance and save to db.
    Again .create_batch(10) for multiple instances and save them.

    User .build() for single local instance
    and .build_batch(10) for multiple local instances.
    """

    name = factory.Faker("sentence")
    parcel = factory.SubFactory(ParcelFactory)

    class Meta:
        model = Lot
