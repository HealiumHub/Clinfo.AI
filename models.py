from typing import Optional, Union
from pydantic import BaseModel


class SearchPayload(BaseModel):
    question: str


class ArticleSummary(BaseModel):
    title: str
    url: str
    abstract: str
    citation: str
    is_relevant: bool
    PMID: str

    summary: str
    study_analysis: str
    risk_of_bias: str

    full_text: Optional[str] = ""
    PMCID: Optional[str] = None
    PMCID_path: Optional[str] = None


class SearchFollowupPayload(BaseModel):
    question: str
    """
    "title": "Adherence to Antiretroviral Therapy Among HIV-Positive Pregnant Women on followup at Mizan Tepi University Teaching and Tepi General Hospitals, Southwest Ethiopia.",
    "url": "https://pubmed.ncbi.nlm.nih.gov/32321354/",
    "abstract": "<b>Background:</b> The introduction of highly active antiretroviral therapy has not only improved longevity in human immunodeficiency virus (HIV)-infected individuals but in addition has had a significant impact on the rate of mother-to-child transmission of the infection. <b>Objective:</b> To assess antiretroviral therapy adherence among HIV-positive pregnant women on follow-up at antiretroviral therapy clinic of Mizan Tepi University Teaching and Tepi General Hospitals. <b>Methods:</b> A descriptive cross-sectional study was undertaken in antiretroviral therapy clinics of Mizan Tepi University Teaching and Tepi General Hospitals from April to May 2018. Data were collected through face to face interview using structured and pretested questionnaires and analyzed using Statistical Package for Social Sciences version 20. <b>Results:</b> Majority of the patients had good adherence to their antiretroviral therapy, 68 (66.00%). Medication side effects, 12 (34.00%) and forgetfulness and distance of the hospital from home, each accounting 11 (31.00%) were the main reasons for nonadherence among nonadherent patients. Frequency of counseling (<i>P</i> = .000), CD4 count (χ<sup>2</sup> = 37.529, <i>P</i> = .000), World Health Organization's clinical stage (χ<sup>2</sup> = 17.515, <i>P</i> = .000), stigma (χ<sup>2</sup> = 70.426, <i>P</i> = .000), and family support (χ<sup>2</sup> = 46.383, <i>P</i> = .000) were found to be associated with patients' medication adherence. <b>Conclusion:</b> The overall patient adherence to antiretroviral therapy in the study facilities was good. Collaborative work among patients, health care organizations, and the public are necessary to tackle the adherence obstacles and enhance patient adherence to the prescribed medication.",
    "citation": "Ikechebelu JI, Ugboaja JO, Kalu SO, Ugochukwu EF. The outcome of prevention of mother to child transmission (PMTCT) of HIV infection programme in Nnewi, Southeast Nigeria. Niger J Med. 2011;20:421-425.",
    "is_relevant": true,
    "PMID": "32321354",
    "PMCID": "PMC7180300",
    "summary": "*Summary:* The abstract does not provide specific evidence regarding the percentage of HIV-positive patients who transmit the virus to their children. Instead, it focuses on the adherence to antiretroviral therapy among HIV-positive pregnant women, which is a critical factor in reducing mother-to-child transmission of HIV.\n\n**Study Design:** Descriptive cross-sectional study.\n\n**Sample Size:** Not explicitly stated in the abstract.\n\n**Study Population:** HIV-positive pregnant women attending antiretroviral therapy clinics at Mizan Tepi University Teaching and Tepi General Hospitals.\n\n**Risk of Bias:** Potential risks of bias include self-reported adherence data, which can be subject to recall bias and social desirability bias. Additionally, the study's cross-sectional design limits the ability to establish causality. The abstract does not mention random sampling, which could introduce selection bias.",
    "PMCID_path": "oa_noncomm/txt/all/PMC7180300.txt"
    """
    article_summaries: list[ArticleSummary]
    # article_paths: list[str]
    context: list[str]
