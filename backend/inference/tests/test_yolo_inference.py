from pathlib import Path
from django.test import TestCase
from inference.services.yolov8 import YOLOv8, utils as YOLOv8_utils
from inference.services.yolo_inference import perform_yolo_inference


class YOLOInferenceTestCase(TestCase):
    def test_infer_with_leaves_model(self):
        """Test the inference procedure with a leaves model"""
        model_filepath: Path = (
            Path(__file__).parent.parent
            / "services"
            / "onnx_models"
            / "leaves_disease_detection.onnx"
        )
        self.assertTrue(model_filepath.exists())

        YOLOv8_utils.class_names = ["a", "b", "c", "d", "e", "f"]
        model: YOLOv8 = YOLOv8(str(model_filepath), conf_thres=0.2, iou_thres=0.3)

        image_filepath: Path = Path(__file__).parent / "images" / "leaves_sample.jpg"
        self.assertTrue(image_filepath.exists())

        results = perform_yolo_inference(str(image_filepath), model)

        self.assertEquals(len(results.boxes), len(results.scores))
        self.assertEquals(len(results.boxes), len(results.class_ids))

        expected_class_ids = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        for i in range(len(expected_class_ids)):
            self.assertEquals(expected_class_ids[i], results.class_ids[i])
