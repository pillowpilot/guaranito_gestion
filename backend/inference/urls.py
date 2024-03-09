from rest_framework.routers import SimpleRouter
from inference.views import InferenceModelViewSet, InferenceJobViewSet

urlpatterns = []

router = SimpleRouter()
router.register(
    r"api/inferencemodels", InferenceModelViewSet, basename="inferencemodel"
)
router.register(r"api/inferencejobs", InferenceJobViewSet, basename="inferencejob")

urlpatterns += router.urls
