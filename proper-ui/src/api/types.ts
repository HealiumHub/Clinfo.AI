export interface ArticleSummary {
  title: string;
  url: string;
  abstract: string;
  citation: string;
  is_relevant: boolean;
  PMID: string;
  summary: string;
}

export interface ClinfoResponse {
  synthesis: string;
  translate_synthesis: string;
  article_summaries: ArticleSummary[];
}