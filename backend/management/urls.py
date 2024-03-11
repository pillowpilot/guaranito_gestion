from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import SimpleRouter
from management.views import ParcelViewSet, LotViewSet

urlpatterns = []

router = SimpleRouter()
router.register(r"api/parcels", ParcelViewSet, basename="parcel")
router.register(r"api/lots", LotViewSet, basename="lot")

urlpatterns += router.urls
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
