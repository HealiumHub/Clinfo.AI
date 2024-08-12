import os

# Make Sure you followed at least step 1-2 before running this cell.
from src.clinfoai.pubmed_engine import PubMedNeuralRetriever

PROMPS_PATH = os.path.join(
    ".", "src", "clinfoai", "prompts", "PubMed", "Architecture_1", "master.json"
)
MODEL: str = "gpt-4o-2024-08-06"

nrpm = PubMedNeuralRetriever(
    architecture_path=PROMPS_PATH,
    model=MODEL,
    verbose=False,
    debug=False,
    open_ai_key=os.getenv("OPENAI_API_KEY", ""),
    email=os.getenv("EMAIL", ""),
)


def search_articles(question: str):
    ### STEP 1: Search PubMed ###
    pubmed_queries, article_ids = nrpm.search_pubmed(
        question, num_results=10, num_query_attempts=1
    )

    ### STEP 2: Fetch article data ###
    articles = nrpm.fetch_article_data(article_ids)

    return articles


def post_process_answer(summary: str) -> str:
    summary = summary.replace("TL;DR:", "**TL;DR:**")
    summary = summary.replace("Literature Summary:", "**Literature Summary:**")

    # Trick lord, refs are added via prompt, not sure impact of changing prompt to quality yet
    # -> So I'll rule-based cut all References out.
    # remove everything after References, refs are generated on FE.
    if "References" in summary:
        summary = summary[: summary.find("References")]

    return summary


def highlight_summary(summary: str) -> str:
    summary = summary.replace("Summary:", "**Summary:**")
    summary = summary.replace("Study Design:", "**Study Design:**")
    summary = summary.replace("Sample Size:", "**Sample Size:**")
    summary = summary.replace("Study Population:", "**Study Population:**")
    summary = summary.replace("Risk of Bias:", "**Risk of Bias:**")
    summary = summary.replace("Citation:", "**Citation:**")

    return summary
