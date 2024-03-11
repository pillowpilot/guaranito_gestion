import logging
from typing import List
from dataclasses import dataclass
import cv2
import numpy as np
from celery import shared_task
from deepforest import main


logger = logging.getLogger()

PATCH_SIZE: int = 800
BOUNDING_BOX_COLOR = (255, 0, 0)
BOUNDING_BOX_THICKNESSS: int = 3


@dataclass(frozen=True)
class DeepforestInferenceResult: # TODO Make it JSON-able to push it into redis
    boxes: np.ndarray | list


@shared_task(bind=True)
def perform_tree_counting_inference(self, image_filepath: str) -> None:
    tree_counting_model = main.deepforest()
    tree_counting_model.use_release(check_release=False)

    logger.info(f"Infering over {image_filepath}")
    boxes = tree_counting_model.predict_tile(
        raster_path=image_filepath,
        return_plot=False,
        patch_size=PATCH_SIZE,
        color=BOUNDING_BOX_COLOR,
        thickness=BOUNDING_BOX_THICKNESSS,
    )
    logger.info(f"Inference results:")
    logger.info(f"boxes: {boxes}")

    # results = DeepforestInferenceResult(boxes=boxes)

    annotated_image = tree_counting_model.predict_tile(
        raster_path=image_filepath,
        return_plot=True,
        patch_size=PATCH_SIZE,
        color=BOUNDING_BOX_COLOR,
        thickness=BOUNDING_BOX_THICKNESSS,
    )
    annotated_image = cv2.cvtColor(annotated_image, cv2.COLOR_RGB2BGR)
    # logger.info(f"annotated_image: {annotated_image.shape}")

    cv2.imwrite(str(image_filepath), annotated_image)

    # return results
