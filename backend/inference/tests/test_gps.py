from pathlib import Path
from django.test import TestCase
from inference.services.gps import Coordinates, extract_coordinates


class GPSTestCase(TestCase):
    def test_extract_gps_data(self):
        """Test that GPS data is correctly extracted"""
        image_filepath = Path(__file__).parent / "images" / "withGPS.jpg"
        self.assertTrue(image_filepath.exists())
        results: Coordinates | None = extract_coordinates(str(image_filepath))
        self.assertNotEquals(results, None)
        if results:
            self.assertEquals(results.latitude, -25.31331300013118)
            self.assertEquals(results.longitude, -57.385562)

    def test_no_gps_data(self):
        """Test return none if there is no GPS data"""
        image_filepath = Path(__file__).parent / "images" / "withoutGPS.jpg"
        self.assertTrue(image_filepath.exists())
        results: Coordinates | None = extract_coordinates(str(image_filepath))
        self.assertEquals(results, None)
