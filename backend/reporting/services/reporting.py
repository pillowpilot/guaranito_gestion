import weasyprint
from pathlib import Path
from jinja2 import Environment, FileSystemLoader
from inference.models import InferenceJob, Lot
from reporting.services.utils import dd2dms


def formatCoordinates(inference: InferenceJob) -> str:
    """Extract coordinates (if any) from an inference job and returns a formated string"""
    if not inference.latitude or not inference.longitude:
        return "Sin coordenadas"
    else:
        try:
            formated = f"({dd2dms(inference.latitude, 'y')}, {dd2dms(inference.longitude, 'x')})"
            return formated
        except ValueError:
            return "Sin coordenadas"


def render_html(context: dict):
    templates_dir = Path(__file__).parent / "report_templates"
    template_filename = "inferences_fruits_leaves.html"

    env = Environment(loader=FileSystemLoader(str(templates_dir)))
    template = env.get_template(template_filename)
    html = template.render(context)
    return html


def render_html_from_queryset(queryset):
    lots = queryset.values("lot__parcel").order_by("lot__parcel").distinct()
    print(lots)
    images = []
    for inference in queryset:
        parcel = Lot.objects.get(pk=inference.lot.id).parcel
        image_filepath = Path(inference.image.path)
        thumbnail_filepath = (
            image_filepath.parent
            / f"{image_filepath.stem}_thumbnail{image_filepath.suffix}"
        )
        images.append(
            {
                "model": inference.model,
                "created_on": inference.created_at.strftime("%d/%m/%y %H:%M"),
                "user": inference.user,
                "lot": inference.lot.name,
                "parcel": f"{parcel.name}",
                "coords": formatCoordinates(inference),
                "path": f"file://{str(image_filepath)}",
            }
        )

    # print(images)
    context = {
        "page_title_text": "Inferencias",
        "title_text": "Inferencias",
        "text": "Listado de todas las inferencias",
        "images": images,
    }

    html = render_html(context)
    return html


def render_pdf_from_queryset(queryset):
    html = render_html_from_queryset(queryset)
    # with open("report2.html", "w") as f:
    #     f.write(html)
    # print(html)
    # html = None
    # with open("/home/federico/gestion_webapp/backend/reporting/report_templates/report.html", "r") as f:
    #     html = f.read()
    pdf = weasyprint.HTML(string=html).write_pdf()
    return pdf
