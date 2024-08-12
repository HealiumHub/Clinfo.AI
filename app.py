import logging
import os

from fastapi import FastAPI, status
from fastapi.responses import JSONResponse


# Make Sure you followed at least step 1-2 before running this cell.
from models import Payload
from fastapi.middleware.cors import CORSMiddleware

from utilities import nrpm, post_process_answer, search_articles, highlight_summary

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
def search(payload: Payload):
    articles = search_articles(payload.question)

    ### STEP 3 Summarize each article (only if they are relevant [Step 3]) ###
    article_summaries, irrelevant_articles = nrpm.summarize_each_article(
        articles, payload.question
    )
    synthesis, citations = nrpm.synthesize_all_articles(
        article_summaries, payload.question, with_url=True
    )

    # Display sample result (you would replace this with actual search results)
    translate_synthesis = nrpm.translate_en_to_vn(synthesis)

    for article in article_summaries:
        article["summary"] = highlight_summary(article["summary"])

    return JSONResponse(
        content={
            "synthesis": {
                "content": post_process_answer(synthesis),
                "citations": citations,
            },
            "translate_synthesis": translate_synthesis,
            "article_summaries": article_summaries,
        },
        status_code=status.HTTP_200_OK,
    )
