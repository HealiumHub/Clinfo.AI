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
  synthesis: ClinfoSynthesis;
  translate_synthesis: string;
  article_summaries: ArticleSummary[];
}

export interface ClinfoSynthesis {
  content: string;
  citations: ClinfoSynthesisCitation[];
}

export interface ClinfoSynthesisCitation {
  index: number;
  url: string;
  text: string;
}
