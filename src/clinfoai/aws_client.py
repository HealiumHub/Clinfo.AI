from email.policy import strict
from fileinput import filename
import string
from typing import Optional
import boto3
import aioboto3
from botocore import UNSIGNED
from botocore.client import Config
import asyncio
import os
from botocore.exceptions import ClientError
from sqlalchemy import null  # Import ClientError


class S3Client:
    bucket_name = "pmc-oa-opendata"
    object_names = [
        "oa_comm/txt/all/",
        "oa_noncomm/txt/all/",
        "phe_timebound/txt/all/",
        "author_manuscript/txt/all/",
    ]
    download_folder = "pmc_txt"

    def __init__(self):
        self.s3 = boto3.client("s3", config=Config(signature_version=UNSIGNED))
        self.as3 = None

        # Create the directory if it doesn't exist
        os.makedirs(self.download_folder, exist_ok=True)

    def read_many_files_from_disk(self, file_names: list[str]):
        return {
            file_name: self.read_file_from_disk(file_name) for file_name in file_names
        }

    def read_file_from_disk(self, file_name: str):
        file_path = os.path.join(self.download_folder, file_name)
        with open(file_path, "r") as file:
            return file.read()

    async def init_async_client(self):
        self.as3 = aioboto3.Session()

    def download_files(self, file_paths: list[str]):
        for file_path in file_paths:
            file_name = file_path.split("/")[-1]

            # If folder does not exist, create it
            if not os.path.exists(self.download_folder):
                os.makedirs(self.download_folder)

            download_path = os.path.join(self.download_folder, file_name)
            # If folder containing the file does not exist, create it
            if not os.path.exists(os.path.dirname(download_path)):
                os.makedirs(os.path.dirname(download_path))

            try:
                self.s3.download_file(self.bucket_name, file_path, download_path)
                print(f"File downloaded to {download_path}")
            except ClientError as e:
                print(f"Error downloading {file_name}: {e}")

    async def async_download_files(self, file_names: list[str]):
        if self.as3 is None:
            await self.init_async_client()
        async with self.as3.client(
            "s3", config=Config(signature_version=UNSIGNED)
        ) as s3:
            for file_name in file_names:
                download_path = os.path.join(self.download_folder, file_name)
                object_name = f"{self.object_name}{file_name}"
                try:
                    await s3.download_file(self.bucket_name, object_name, download_path)
                    print(f"File downloaded to {download_path}")
                except ClientError as e:
                    print(f"Error downloading {file_name}: {e}")

    def check_file_existence(self, file_name: str) -> Optional[str]:
        for object_name in self.object_names:
            path = f"{object_name}{file_name}"
            try:
                self.s3.head_object(Bucket=self.bucket_name, Key=path)
                return path
            except ClientError as e:
                if e.response["Error"]["Code"] != "404":
                    print(f"Error checking existence of {file_name}: {e}")
        return None


if __name__ == "__main__":
    # # Example usage
    # s3_client = S3Client()
    # s3_client.download_files(["PMC10003318.txt", "PMC10003319.txt"])

    # # Asynchronous example usage
    # async def main():
    #     s3_client = S3Client()
    #     await s3_client.async_download_files(["PMC10003318.txt", "PMC10003319.txt"])

    # asyncio.run(main())

    # Check if files exist
    s3_client = S3Client()
    print(s3_client.check_file_existence("PMC28636.txt"))
