import logging
import boto3
from botocore.config import Config
from botocore.exceptions import ClientError
from django.conf import settings

logger = logging.getLogger()


def _get_bucket_name() -> str:
    """Just extracts the bucket name from project settings"""
    app_settings: dict[str, str] = settings.S3_STORAGE_SETTINGS

    return app_settings["BUCKET_NAME"]


def _build_s3_client():
    """Buils the s3 client from the project settings"""
    app_settings: dict[str, str] = settings.S3_STORAGE_SETTINGS

    client_config = Config(
        region_name=app_settings["REGION"],
        signature_version="v4",
        retries={"max_attempts": 10, "mode": "standard"},
    )
    return boto3.client("s3", config=client_config)


def generate_presigned_url_for_GET(object_name: str) -> str | None:
    s3_client = _build_s3_client()

    try:
        response = s3_client.generate_presigned_url(
            "get_object",
            Params={"Bucket": _get_bucket_name(), "Key": object_name},
            ExpiresIn=3600,
        )
    except ClientError as e:
        logger.error(f"{e}")
        return None

    return response


def generate_presigned_url_for_PUT(object_name: str) -> tuple[str, dict] | None:
    s3_client = _build_s3_client()

    try:
        response: dict = s3_client.generate_presigned_post(
            _get_bucket_name(), object_name, ExpiresIn=3600
        )
        url = response["url"]
        fields = response["fields"]
    except ClientError as e:
        logger.error(f"{e}")
        return None

    return (url, fields)
