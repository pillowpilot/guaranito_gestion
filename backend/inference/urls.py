from rest_framework.routers import SimpleRouter
from inference.views import InferenceModelViewSet

urlpatterns = []

router = SimpleRouter()
router.register(
    r"api/inferencemodels", InferenceModelViewSet, basename="inferencemodel"
)

urlpatterns += router.urls
