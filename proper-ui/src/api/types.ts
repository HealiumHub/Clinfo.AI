export interface ArticleSummary {
  title: string;
  url: string;
  abstract: string;
  citation: string;
  is_relevant: boolean;
  PMID: string;
  PMCID: string | null;
  PMCID_path: string | null;
  summary: string;
}

export interface ArticleSummaryAnalyzeFiles extends ArticleSummary {
  full_text: string;
}

export interface ClinfoResponseAnalyzeFiles {
  synthesis: ClinfoSynthesis;
  translate_synthesis: string;
  article_summaries: ArticleSummaryAnalyzeFiles[];
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
