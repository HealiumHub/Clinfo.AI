import boto3
import aioboto3
from botocore import UNSIGNED
from botocore.client import Config
import asyncio
import os
from botocore.exceptions import ClientError  # Import ClientError


class S3Client:
    bucket_name = "pmc-oa-opendata"
    object_name = "oa_comm/txt/all/"
    download_folder = "pmc_txt"

    def __init__(self):
        self.s3 = boto3.client("s3", config=Config(signature_version=UNSIGNED))
        self.as3 = None

        # Create the directory if it doesn't exist
        os.makedirs(self.download_folder, exist_ok=True)

    async def init_async_client(self):
        self.as3 = aioboto3.Session()

    def download_files(self, file_names: list[str]):
        for file_name in file_names:
            download_path = os.path.join(self.download_folder, file_name)
            object_name = f"{self.object_name}{file_name}"
            try:
                self.s3.download_file(self.bucket_name, object_name, download_path)
                print(f"File downloaded to {download_path}")
            except ClientError as e:
                print(f"Error downloading {file_name}: {e}")

    async def async_download_files(self, file_names: list[str]):
        if self.as3 is None:
            await self.init_async_client()
        async with self.as3.client("s3", config=Config(signature_version=UNSIGNED)) as s3:
            for file_name in file_names:
                download_path = os.path.join(self.download_folder, file_name)
                object_name = f"{self.object_name}{file_name}"
                try:
                    await s3.download_file(self.bucket_name, object_name, download_path)
                    print(f"File downloaded to {download_path}")
                except ClientError as e:
                    print(f"Error downloading {file_name}: {e}")


if __name__ == "__main__":
    # Example usage
    s3_client = S3Client()
    s3_client.download_files(["PMC10003318.txt", "PMC10003319.txt"])

    # Asynchronous example usage
    async def main():
        s3_client = S3Client()
        await s3_client.async_download_files(["PMC10003318.txt", "PMC10003319.txt"])

    asyncio.run(main())
