from django.urls import path
from reporting.views import get_company_inferences_report

urlpatterns = [
    path("api/reports", get_company_inferences_report)
]
