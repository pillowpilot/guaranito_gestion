from pathlib import Path
from django.test import TestCase
from inference.services.deepforest_inference import perform_tree_counting_inference


class DeepForrestInferenceTestCase(TestCase):
    def test_inference(self):
        image_filepath: Path = Path(__file__).parent / "images" / "trees_sample.jpg"
        self.assertTrue(image_filepath.exists())

        perform_tree_counting_inference(str(image_filepath))
        # TODO Read the output! We should make its return value 
        # JSON serializable to move it around celery and redis!