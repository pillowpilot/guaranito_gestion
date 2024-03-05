from rest_framework.routers import SimpleRouter
from management.views import ParcelViewSet

urlpatterns = []

router = SimpleRouter()
router.register(r"api/parcels", ParcelViewSet, basename="parcel")

urlpatterns += router.urls
