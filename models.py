from typing import Union
from pydantic import BaseModel


class SearchPayload(BaseModel):
    question: str


class AnalyseFilesPayload(BaseModel):
    file_ids: list[str]
