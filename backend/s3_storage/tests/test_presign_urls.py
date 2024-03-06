import requests, json
from pathlib import Path
from django.test import TestCase
from s3_storage.services import (
    generate_presigned_url_for_GET,
    generate_presigned_url_for_PUT,
)


class TestPresignURLService(TestCase):
    def test_generate_presigned_GET(self):
        url = generate_presigned_url_for_GET("testing_files/caacupe.geojson")
        if url:
            response = requests.get(url)
            self.assertEqual(response.status_code, 200)
            geodata = json.loads(response.content)
            self.assertTrue("type" in geodata.keys())
            self.assertEqual(geodata["type"], "FeatureCollection")
            self.assertTrue("features" in geodata.keys())

    def test_generate_presigned_PUT(self):
        url, fields = generate_presigned_url_for_PUT("testing_files/testfile.txt")
        if url:
            testfile: Path = Path(__file__).parent / "testfile.txt"
            self.assertTrue(testfile.exists())
            with open(str(testfile), "r") as f:
                files = {"file": ("testing_files/testfile.txt")}
                response = requests.post(url, data=fields, files=files)
                self.assertEqual(response.status_code, 204)
