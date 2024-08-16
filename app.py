import logging
import os

from fastapi import FastAPI, status
from fastapi.responses import JSONResponse
import asyncio

# Make Sure you followed at least step 1-2 before running this cell.
from models import AnalyseFilesPayload, SearchPayload
from fastapi.middleware.cors import CORSMiddleware

from utilities import (
    afetch_full_article_content,
    fetch_full_article_content,
    get_PMCID_path,
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


@app.post("/analyse/files")
def analyse_files(payload: AnalyseFilesPayload):
    fetch_full_article_content(payload.file_ids)
    # asyncio.run(afetch_full_article_content(payload.file_ids))
    return JSONResponse(
        content={"message": "Files downloaded successfully"},
        status_code=status.HTTP_200_OK,
    )

    # return JSONResponse(
    #     content={
    #         "synthesis": {
    #             "content": post_process_answer(synthesis),
    #             "citations": citations,
    #         },
    #         "translate_synthesis": translate_synthesis,
    #         "article_summaries": article_summaries,
    #     },
    #     status_code=status.HTTP_200_OK,
    # )
