from rest_framework.routers import SimpleRouter
from management.views import ParcelViewSet, LotViewSet

urlpatterns = []

router = SimpleRouter()
router.register(r"api/parcels", ParcelViewSet, basename="parcel")
router.register(r"api/lots", LotViewSet, basename="lot")

urlpatterns += router.urls
