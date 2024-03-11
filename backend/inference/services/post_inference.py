from celery import shared_task
from inference.models import InferenceJob


@shared_task(bind=True)
def cleanup_after_deepforest_inference(
    self,
    previous_task_results: any,
    inference_job_id: int,
) -> None:
    job = InferenceJob.objects.get(id=inference_job_id)
    job.status = "success"
    job.save()
