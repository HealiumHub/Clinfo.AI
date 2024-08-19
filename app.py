import json
import logging
import os

from fastapi import FastAPI, status
from fastapi.responses import JSONResponse
import asyncio

# Make Sure you followed at least step 1-2 before running this cell.
from models import AnalyseFilesPayload, SearchPayload
from fastapi.middleware.cors import CORSMiddleware
import time

from utilities import (
    afetch_full_article_content,
    fetch_full_article_content,
    get_PMCID_path,
    get_full_article_content_from_disk,
    nrpm,
    post_process_answer,
    search_articles,
    highlight_summary,
)

logger = logging.getLogger(__name__)

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/search")
def search(payload: SearchPayload):
    articles = search_articles(payload.question)
    ### STEP 3 Summarize each article (only if they are relevant [Step 3]) ###
    article_summaries, irrelevant_articles = nrpm.summarize_each_article(
        articles, payload.question
    )
    synthesis, citations = nrpm.synthesize_all_articles(
        article_summaries, payload.question, with_url=True
    )

    # Display sample result (you would replace this with actual search results)
    # translate_synthesis = nrpm.translate_en_to_vn(synthesis)

    for article in article_summaries:
        article["summary"] = highlight_summary(article["summary"])
        article["PMCID_path"] = get_PMCID_path(f"{article["PMCID"]}.txt")

    return JSONResponse(
        content={
            "synthesis": {
                "content": post_process_answer(synthesis),
                "citations": citations,
            },
            "translate_synthesis": "",
            "article_summaries": article_summaries,
        },
        status_code=status.HTTP_200_OK,
    )


@app.post("/search/follow-up")
def analyse_files(payload: AnalyseFilesPayload):
    article_paths = [article["PMCID_path"] for article in payload.article_summaries]
    fetch_full_article_content(article_paths)

    article_text_file_names = [
        f"{article["PMCID"]}.txt" for article in payload.article_summaries
    ]
    file_contents = get_full_article_content_from_disk(article_text_file_names)

    for article, file_name in zip(payload.article_summaries, article_text_file_names):
        article["full_text"] = file_contents[file_name]

    answer, citations = nrpm.synthesize_from_full_text_articles(
        payload.question, payload.article_summaries
    )

    return JSONResponse(
        content={
            "synthesis": {
                "content": post_process_answer(answer),
                "citations": citations,
            },
            # "translate_synthesis": translate_synthesis,
            "article_summaries": payload.article_summaries,
        },
        status_code=status.HTTP_200_OK,
    )


@app.post("/mock/search")
def mockSearch(payload: SearchPayload):
    time.sleep(3)
    with open("mock_response/mock_search.json") as f:
        data = json.load(f)

    return JSONResponse(
        content=data,
        status_code=status.HTTP_200_OK,
    )


@app.post("/mock/search/follow-up")
def mockAnalyzeFiles(payload: SearchPayload):
    time.sleep(3)
    with open("mock_response/mock_search_follow_up.json") as f:
        data = json.load(f)

    return JSONResponse(
        content=data,
        status_code=status.HTTP_200_OK,
    )
