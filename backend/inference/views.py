from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from inference.models import InferenceModel
from inference.serializers import InferenceModelSerializer


class InferenceModelViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Inference Models viewset
    """

    queryset = InferenceModel.objects.all()
    serializer_class = InferenceModelSerializer
    permission_classes = [IsAuthenticated]
