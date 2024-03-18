import logging
from celery import shared_task
from PIL import Image
from pathlib import Path
from inference.models import InferenceJob

logger = logging.getLogger()


@shared_task(bind=True)
def cleanup_after_deepforest_inference(
    self,
    previous_task_results: any,
    inference_job_id: int,
) -> None:
    job = InferenceJob.objects.get(id=inference_job_id)
    job.status = "success"
    job.save()
    return inference_job_id


@shared_task(bind=True)
def generate_thumbnail(self, previous_task_results: any, inference_job_id: int):
    job = InferenceJob.objects.get(id=inference_job_id)
    image_filepath = Path(job.image.path)
    max_size = (512, 512)
    output_filename = (
        image_filepath.parent
        / f"{image_filepath.stem}_thumbnail{image_filepath.suffix}"
    )
    logger.info(f"Saving thumbnail to {output_filename}")

    image = Image.open(str(image_filepath))
    image.thumbnail(max_size)
    image.save(str(output_filename))
    logger.info(f"Saved")
    return inference_job_id
