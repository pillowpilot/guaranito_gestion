from pathlib import Path
from django.test import TestCase
from reporting.services.reporting import render_pdf_from_queryset
from inference.factories import InferenceJobFactory
from inference.models import InferenceJob


class RenderPDFTestCase(TestCase):
    def test_render(self):
        InferenceJobFactory.create_batch(10)
        qs = InferenceJob.objects.all()
        pdf = render_pdf_from_queryset(qs)
        output_filepath = Path(__file__).parent / "test.pdf"
        with open(output_filepath, "wb") as f:
            f.write(pdf)