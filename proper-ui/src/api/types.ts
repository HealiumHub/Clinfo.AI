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
  risk_of_bias: string;
  study_analysis: string;
}

export interface ArticleSummaryFollowup extends ArticleSummary {
  full_text: string;
}

export interface ClinfoResponseFollowup {
  synthesis: ClinfoSynthesis;
  translate_synthesis: string;
  article_summaries: ArticleSummaryFollowup[];
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
