from io import BytesIO
from django.http import FileResponse
from reporting.services.reporting import render_pdf_from_queryset
from inference.models import InferenceJob


# TODO Make it require auth
def get_company_inferences_report(request):
    qs = InferenceJob.objects.all()  # TODO Filter by company
    pdf = render_pdf_from_queryset(qs)
    stream = BytesIO(pdf)
    return FileResponse(stream, as_attachment=True, filename=f"Reporte.pdf")
