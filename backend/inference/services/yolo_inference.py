import logging
from typing import List
from dataclasses import dataclass
from pathlib import Path
from PIL import Image as PILImage
import cv2
import numpy as np
from .yolov8 import YOLOv8, utils as YOLOv8_utils

logger = logging.getLogger()


LEAVES_MODEL_FILEPATH = (
    Path(__file__).parent / "./onnx_models/leaves_disease_detection.onnx"
)
FRUITS_MODEL_FILEPATH = (
    Path(__file__).parent / "./onnx_models/fruits_disease_detection.onnx"
)

if not LEAVES_MODEL_FILEPATH.exists():
    logger.error(f"Mode at {str(LEAVES_MODEL_FILEPATH)} not found")

if not FRUITS_MODEL_FILEPATH.exists():
    logger.error(f"Model at {str(FRUITS_MODEL_FILEPATH)} not found")


class LeavesClassNames:
    """
    Codify class names for the leaves model

    Modify each inference class name by assigning the desired text into
    the corresponding variable. Eg: class_names.healthy_leaf = "Saludable"
    """

    default_class_names = [
        "healthy-leaf",
        "moscanegra-leaf",
        "moscanegra-defect",
        "fumagina-leaf",
        "canker-leaf",
        "canker-defect",
    ]

    def __init__(self):
        self.healthy_leaf = LeavesClassNames.default_class_names[0]
        self.moscanegra_leaf = LeavesClassNames.default_class_names[1]
        self.moscanegra_defect = LeavesClassNames.default_class_names[2]
        self.fumagina_leaf = LeavesClassNames.default_class_names[3]
        self.canker_leaf = LeavesClassNames.default_class_names[4]
        self.canker_defect = LeavesClassNames.default_class_names[5]

    def generate_class_name_list(self):
        return [
            self.healthy_leaf,
            self.moscanegra_leaf,
            self.moscanegra_defect,
            self.fumagina_leaf,
            self.canker_leaf,
            self.canker_defect,
        ]


class FruitsClassNames:
    """
    Codify class names for the fruits model

    Modify each inference class name by assigning the desired text into
    the corresponding variable. Eg: class_names.healthy_fruit = "Saludable"
    """

    default_class_names = [
        "healthy-fruit",
        "canker-fruit",
        "canker-defect",
        "scab-fruit",
        "scab-defect",
        "blackspot-fruit",
        "blackspot-defect",
        "stem",
    ]

    def __init__(self):
        self.healthy_fruit = FruitsClassNames.default_class_names[0]
        self.canker_fruit = FruitsClassNames.default_class_names[1]
        self.canker_defect = FruitsClassNames.default_class_names[2]
        self.scab_fruit = FruitsClassNames.default_class_names[3]
        self.scab_defect = FruitsClassNames.default_class_names[4]
        self.blackspot_fruit = FruitsClassNames.default_class_names[5]
        self.blackspot_defect = FruitsClassNames.default_class_names[6]
        self.stem = FruitsClassNames.default_class_names[7]

    def generate_class_name_list(self):
        return [
            self.healthy_fruit,
            self.canker_fruit,
            self.canker_defect,
            self.scab_fruit,
            self.scab_defect,
            self.blackspot_fruit,
            self.blackspot_defect,
            self.stem,
        ]


@dataclass(frozen=True)
class YOLOInferenceResult:
    boxes: np.ndarray | list
    scores: np.ndarray | list
    class_ids: np.ndarray | list


def perform_yolo_inference(image_filepath: str, model: YOLOv8) -> YOLOInferenceResult:
    """Perform an inference using a YOLOv8 on an image, given its filepath"""
    image_pil = PILImage.open(image_filepath)
    image_cv2 = cv2.cvtColor(np.array(image_pil), cv2.COLOR_RGB2BGR)
    boxes, scores, class_ids = model(image_cv2)

    results = YOLOInferenceResult(boxes=boxes, scores=scores, class_ids=class_ids)

    logger.debug(f"Inference results:")
    logger.debug(f"boxes: {results.boxes}")
    logger.debug(f"scores: {results.scores}")
    logger.debug(f"cls ids: {results.class_ids}")

    return results


def draw_yolo_boxes_on_image(
    image_filepath: str,
    results: YOLOInferenceResult,
    class_names: List[str],
):
    """
    Given an image filepath, an inference results and a list of result class names,
    draw the set of boxes of the inference result on the image.
    """
    YOLOv8_utils.class_names = class_names

    image_pil = PILImage.open(image_filepath)
    image_cv2 = cv2.cvtColor(np.array(image_pil), cv2.COLOR_RGB2BGR)

    annotated_image_cv2 = YOLOv8_utils.draw_detections(
        image_cv2, results.boxes, results.scores, results.class_ids
    )

    logger.debug(f"Drawing boxes on {image_filepath} using class names={class_names}.")
    cv2.imwrite(image_filepath, annotated_image_cv2)
    logger.debug(f"Drawing done.")


def perform_leaves_diseases_inference(
    image_filepath: str,
) -> YOLOInferenceResult | None:
    """
    Performs inference over an image using the leaves model.
    Returns None if the model file is not found. Otherwise an YOLOInferenceResult.
    """
    if not LEAVES_MODEL_FILEPATH.exists():
        logger.error(f"Leaves model at {LEAVES_MODEL_FILEPATH} does not exists!")
        return None
    else:
        model = YOLOv8(str(LEAVES_MODEL_FILEPATH), conf_thres=0.2, iou_thres=0.3)
        return perform_yolo_inference(image_filepath, model)


def perform_fruits_diseases_inference(
    image_filepath: str,
) -> YOLOInferenceResult | None:
    """
    Performs inference over an image using the fruits model.
    Returns None if the model file is not found. Otherwise an YOLOInferenceResult.
    """
    if not FRUITS_MODEL_FILEPATH.exists():
        logger.error(f"Fruits model at {FRUITS_MODEL_FILEPATH} does not exists!")
        return None
    else:
        model = YOLOv8(str(FRUITS_MODEL_FILEPATH), conf_thres=0.2, iou_thres=0.3)
        return perform_yolo_inference(image_filepath, model)
