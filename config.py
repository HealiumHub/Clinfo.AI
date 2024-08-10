import os
from dotenv import load_dotenv

load_dotenv()

NCBI_API_KEY = os.getenv("NCBI_API_KEY", "YOUR API TOKEN")
EMAIL = os.getenv("EMAIL", "YOUR EMAIL")
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY", "YOUR Google API TOKEN")
OPENAI_API_KEY = os.getenv(
    "OPENAI_API_KEY", ""
)  # Required if you want to interact with OpenAI models
# NCBI_API_KEY: str = "YOUR API TOKEN"  # (Optional)
# EMAIL: str = "YOUR EMAIL"  # (Optional)
# GOOGLE_API_KEY: str = (
#     "YOUR Google API TOKEN"  # (Required if you want to interact with Google models via API)
# )
