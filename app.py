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

@app.post("/analyse/files")
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
    return JSONResponse (
        content={
            "synthesis": {
                "content": "**Literature Summary:** Among the studies reviewed, the most relevant evidence regarding the transmission of HIV from mother to child comes from an observational study conducted in Burkina Faso, which reported a mother-to-child transmission (MTCT) rate of 10.42% among HIV-positive pregnant women despite the implementation of a prevention program (Ilboudo et al., 2008). This study involved 379 pregnant women and highlighted that co-infections with human herpesvirus-8 (HHV-8) or hepatitis B virus (HBV) could increase the likelihood of HIV transmission. However, the study's relatively small sample size and observational design may introduce bias, limiting the generalizability of its findings. Other studies provided in the list did not directly address MTCT rates but rather focused on related aspects of HIV infection or other transmission routes.\n\n**TL;DR:** The available evidence suggests that approximately 10.42% of HIV-positive mothers may transmit the virus to their children, though this estimate may vary due to study limitations.\n\n",
                "citations": [
                    {
                        "index": 1,
                        "url": "https://pubmed.ncbi.nlm.nih.gov/19090184/",
                        "text": "Ilboudo D, Karou D, Nadembega WM, Savadogo A, Djeneba O, Pignatelli S, Pietra V, Bere A, Simpore J, Traore AS. Prevalence of human herpes virus-8 and hepatitis B virus among HIV seropositive pregnant women enrolled in the Mother-to-Child HIV Transmission Prevention Program at Saint Camille Medical Centre in Burkina Faso.. Pakistan journal of biological sciences : PJBS. 2008;10(17):2831-7."
                    },
                    {
                        "index": 2,
                        "url": "https://pubmed.ncbi.nlm.nih.gov/10203377/",
                        "text": "Vigano' A, Vella S, Principi N, Bricalli D, Sala N, Salvaggio A, Saresella M, Vanzulli A, Clerici M. Thymus volume correlates with the progression of vertical HIV infection.. AIDS (London, England). 1999;13(5):F29-34."
                    },
                    {
                        "index": 3,
                        "url": "https://pubmed.ncbi.nlm.nih.gov/8460729/",
                        "text": "Health Psychol. 1990;9(3):253-65"
                    },
                    {
                        "index": 4,
                        "url": "https://pubmed.ncbi.nlm.nih.gov/3336781/",
                        "text": "Castro KG, Lieb S, Jaffe HW, Narkunas JP, Calisher CH, Bush TJ, Witte JJ. Transmission of HIV in Belle Glade, Florida: lessons for other communities in the United States.. Science (New York, N.Y.). 1988;239(4836):193-7."
                    },
                    {
                        "index": 5,
                        "url": "https://pubmed.ncbi.nlm.nih.gov/28042001/",
                        "text": "Martínez-Bonet M, González-Serna A, Clemente MI, Morón-López S, Díaz L, Navarro M, Puertas MC, Leal M, Ruiz-Mateos E, Martinez-Picado J, Muñoz-Fernández MA. Relationship between CCR5<sup>(WT/Δ32)</sup> heterozygosity and HIV-1 reservoir size in adolescents and young adults with perinatally acquired HIV-1 infection.. Clinical microbiology and infection : the official publication of the European Society of Clinical Microbiology and Infectious Diseases. 2016;23(5):318-324."
                    }
                ]
            },
            "translate_synthesis": "",
            "article_summaries": [
                {
                    "title": "Prevalence of human herpes virus-8 and hepatitis B virus among HIV seropositive pregnant women enrolled in the Mother-to-Child HIV Transmission Prevention Program at Saint Camille Medical Centre in Burkina Faso.",
                    "url": "https://pubmed.ncbi.nlm.nih.gov/19090184/",
                    "abstract": "The aims of this research are: i) to evaluate the prevalence of HHV-8, HBV and HIV among pregnant women, ii) to determine the percentage of these co-infections and iii) to estimate the frequency of the mother-to-child transmission of HIV among HBV and HHV-8 positive mothers. Thus, 379 pregnant women attending ante-natal consultation in Saint Camille Medical Centre were subject to HIV, HHV-8 antibodies and the viral marker Hepatitis B Surface Antigen (HBsAg) detection. We observed 48/379 (12.66%) HIV seropositive subjects. Among them, HIV-1 type infection was predominant (95.83%), only 2/48 (4.17%) subjects had a dual HIV-1 type and HIV-2 type infection, no single HIV-2 type infection was detected. 38/379 (10.02%) subjects were infected by HHV-8 and 30/379 (7.91%) were HBsAg positive. HHV-8 and HIV Co-infections rates were high within HBV positive patients and we had respectively 20.00 and 16.67%. 10.42% HIV positive women were coinfected by HBV while 12.50% were infected by HHV-8. Then, 15.79% subjects HHV-8 positive were co-infected by HBV or HIV. In spite of the PMTCT protocol application, five (10.42%) HIV positive women transmitted the virus to their children. Two HIV positive mothers were co-infected by HHV-8 and one by HBV. Among the 5 HIV infected, one mother (20.0%) was HBV positive and two (40.0%) HHV-8 positive. Although we did not have a large sample which would show large prélalences of the infections, we could put forward that the Co-infection of the HIV with one of these viruses (HBV or HHV-8) could favorite the mother-to-child transmission.",
                    "citation": "Ilboudo D, Karou D, Nadembega WM, Savadogo A, Djeneba O, Pignatelli S, Pietra V, Bere A, Simpore J, Traore AS. Prevalence of human herpes virus-8 and hepatitis B virus among HIV seropositive pregnant women enrolled in the Mother-to-Child HIV Transmission Prevention Program at Saint Camille Medical Centre in Burkina Faso.. Pakistan journal of biological sciences : PJBS. 2008;10(17):2831-7.",
                    "is_relevant": True,
                    "PMID": "19090184",
                    "PMCID": None,
                    "summary": "**Summary:** The study found that among HIV-positive pregnant women, 10.42% transmitted the virus to their children despite the application of the PMTCT protocol. The study also noted that co-infection with HHV-8 or HBV may increase the likelihood of mother-to-child transmission of HIV.\n\n**Study Design:** Observational study\n\n**Sample Size:** 379 pregnant women\n\n**Study Population:** Pregnant women attending ante-natal consultation at Saint Camille Medical Centre\n\n**Risk of Bias:** The study may have a risk of bias due to a relatively small sample size, which might affect the generalizability of the findings. Additionally, the study's observational nature can introduce confounding factors that are not controlled for, potentially impacting the results.",
                    "PMCID_path": None
                },
                {
                    "title": "Thymus volume correlates with the progression of vertical HIV infection.",
                    "url": "https://pubmed.ncbi.nlm.nih.gov/10203377/",
                    "abstract": "BACKGROUND:\nThe thymus is the organ responsible for the maturation and selection of T lymphocytes and is thus pivotal in allowing the development of a functional immune system. Because in HIV infection cell-mediated immune responses are severely impaired, we studied the role of thymus in the control of the progression of HIV infection to AIDS.\n\nMETHODS:\nThymic volume was analysed by magnetic resonance imaging in 31 vertically HIV-infected children. Plasma HIV viral load and phenotypic and functional cellular immunity-defining parameters were examined in the same patients.\n\nRESULTS:\nThymic volume was not correlated with age or nutritional status; thymic volume was nevertheless correlated with CD4 T-lymphocyte counts and with the percentage and absolute number of CD45RA+CD62L+ (naive) T lymphocytes. In addition, the ability of peripheral blood mononuclear cells to proliferate upon tetanus stimulation was directly proportional to thymic volume. Finally, a negative correlation was detected between thymic volume and HIV viral load.\n\nCONCLUSION:\nBecause low HIV plasma viraemia and preserved immune function are favourable prognostic indices in HIV disease, these data indicate that an immunological, thymic-dependent control of the progression of HIV infection might be possible, at least in vertically transmitted HIV infection.",
                    "citation": "Vigano' A, Vella S, Principi N, Bricalli D, Sala N, Salvaggio A, Saresella M, Vanzulli A, Clerici M. Thymus volume correlates with the progression of vertical HIV infection.. AIDS (London, England). 1999;13(5):F29-34.",
                    "is_relevant": True,
                    "PMID": "10203377",
                    "PMCID": None,
                    "summary": "**Summary:** The abstract does not directly answer the question regarding the percentage of HIV-positive patients who transmit the virus to their children. Instead, it focuses on the role of the thymus in the progression of HIV infection in children who have acquired the virus vertically (from mother to child). The study finds correlations between thymic volume and various immune parameters, suggesting that the thymus may play a role in controlling HIV progression in these patients.\n\n**Study Design:** Observational study analyzing thymic volume and immune parameters in HIV-infected children.\n\n**Sample Size:** 31 vertically HIV-infected children.\n\n**Study Population:** HIV-infected children who acquired the virus through vertical transmission.\n\n**Risk of Bias:** Potential risks of bias include a small sample size, which may limit the generalizability of the findings. Additionally, the study is observational, which can introduce confounding factors that are not controlled for. The specific selection criteria for the children included in the study are not detailed, which could also contribute to selection bias.",
                    "PMCID_path": None
                },
                {
                    "title": "Changes in sexually transmitted disease rates after HIV testing and posttest counseling, Miami, 1988 to 1989.",
                    "url": "https://pubmed.ncbi.nlm.nih.gov/8460729/",
                    "abstract": "OBJECTIVES:\nThe effects of posttest counseling on acquisition of sexually transmitted diseases in patients at a large urban sexually transmitted disease clinic were studied.\n\nMETHODS:\nComparisons were made of the percentage of patients who had a positive gonorrhea culture (or any sexually transmitted disease) in the 6 months before and after human immunodeficiency virus (HIV) counseling and testing.\n\nRESULTS:\nFor 331 patients counseled about a positive HIV test, the percentage with gonorrhea was 6.3 before and 4.5 after posttest counseling (29% decrease). For 666 patients counseled about a negative test, the percentage with gonorrhea was 2.4 before and 5.0 after posttest counseling (106% increase). With any sexually transmitted disease as the outcome, patients who tested positive for HIV had a 12% decrease and patients who tested negative had a 103% increase after counseling.\n\nCONCLUSIONS:\nHIV counseling and testing was associated with a moderate decrease in sexually transmitted diseases among patients who tested positive for the virus, but risk increased for patients who tested negative. This suggests a need to improve posttest counseling in this clinic and to assess the effects of counseling and testing in other clinics.",
                    "citation": "Health Psychol. 1990;9(3):253-65",
                    "is_relevant": True,
                    "PMID": "8460729",
                    "PMCID": "PMC1694465",
                    "summary": "The provided abstract does not directly address the question regarding the percentage of HIV-positive patients who transmit the virus to their children. Instead, it focuses on the effects of posttest counseling on the acquisition of sexually transmitted diseases (STDs) among patients who were tested for HIV. Consequently, the abstract does not contain relevant data to determine the transmission rate of HIV from parents to children.\n\n**Summary:** The abstract does not provide evidence on the percentage of HIV-positive patients who transmit the virus to their children. It discusses the impact of posttest counseling on STD acquisition among patients tested for HIV.\n\n**Study Design:** The study is a comparative analysis of STD rates before and after HIV counseling and testing.\n\n**Sample Size:** The study involved 997 patients in total, with 331 patients who tested positive for HIV and 666 who tested negative.\n\n**Study Population:** Patients at a large urban sexually transmitted disease clinic who underwent HIV counseling and testing.\n\n**Risk of Bias:** The abstract does not provide detailed information on potential sources of bias, such as selection bias, information bias, or confounding factors. Additionally, the study's focus on a single clinic may limit the generalizability of the findings to other settings.",
                    "PMCID_path": None
                },
                {
                "title": "Transmission of HIV in Belle Glade, Florida: lessons for other communities in the United States.",
                "url": "https://pubmed.ncbi.nlm.nih.gov/3336781/",
                "abstract": "The high cumulative incidence of AIDS and the large percentage of AIDS patients with no identified risks in Belle Glade, Florida, were evaluated through case interviews and neighborhood-based seroepidemiologic studies. It was found that of 93 AIDS patients reported between July 1982 and 1 August 1987, 34 could be directly linked to at least one other AIDS patient or to a person with AIDS-related complex by sexual contact, sharing of needles during intravenous drug abuse (or both), or perinatal exposure; of 877 randomly selected adults, 28 had antibodies to HIV; no person over age 60 and none of 138 children aged 2 to 10 years had antibodies to HIV; no clustering of infected persons within households occurred, except in sex partners; and HIV-seropositive adults were more likely than HIV-seronegative adults to be from Haiti, have a lower income, report sex with intravenous drug abusers, and have a history of previous treatment for sexually transmitted diseases. The presence of antibodies to five arboviruses prevalent in South Florida or the Caribbean did not correlate significantly with HIV infection. The high cumulative rate of AIDS in Belle Glade appears to be the result of HIV transmission through sexual contact and intravenous drug abuse; the evidence does not suggest transmission of HIV through insects.",
                "citation": "Castro KG, Lieb S, Jaffe HW, Narkunas JP, Calisher CH, Bush TJ, Witte JJ. Transmission of HIV in Belle Glade, Florida: lessons for other communities in the United States.. Science (New York, N.Y.). 1988;239(4836):193-7.",
                "is_relevant": True,
                "PMID": "3336781",
                "PMCID": None,
                "summary": "**Summary:** The abstract does not directly address the percentage of HIV-positive patients who transmit the virus to their children. However, it mentions that of the 93 AIDS patients studied, some were linked to others through perinatal exposure, implying that mother-to-child transmission was considered. The study primarily focuses on transmission routes such as sexual contact and intravenous drug use, and does not provide a specific percentage for perinatal transmission.\n\n**Study Design:** The study utilized case interviews and neighborhood-based seroepidemiologic studies to evaluate the incidence and transmission patterns of AIDS in Belle Glade, Florida.\n\n**Sample Size:** The study involved 93 reported AIDS patients and 877 randomly selected adults for seroepidemiologic analysis.\n\n**Study Population:** The population studied included AIDS patients in Belle Glade, Florida, from July 1982 to August 1987, and a sample of adults from the same community. The study also considered children aged 2 to 10 years but found no HIV antibodies in this group.\n\n**Risk of Bias:** Potential risks of bias include the limited geographic focus on Belle Glade, which may not be generalizable to other regions. The reliance on self-reported data from case interviews could introduce recall or reporting bias. Additionally, the study does not provide detailed information on the methodology for selecting the random sample of adults, which could affect representativeness.",
                "PMCID_path": None
                },
                {
                "title": "Relationship between CCR5<sup>(WT/Δ32)</sup> heterozygosity and HIV-1 reservoir size in adolescents and young adults with perinatally acquired HIV-1 infection.",
                "url": "https://pubmed.ncbi.nlm.nih.gov/28042001/",
                "abstract": "BACKGROUND:\nSeveral host factors contribute to human immunodeficiency virus (HIV) disease progression in the absence of combination antiretroviral therapy (cART). Among them, the CC-chemokine receptor 5 (CCR5) is known to be the main co-receptor used by HIV-1 to enter target cells during the early stages of an HIV-1 infection.\n\nOBJECTIVE:\nWe evaluated the association of CCR5<sup>(WT/Δ32)</sup> heterozygosity with HIV-1 reservoir size, lymphocyte differentiation, activation and immunosenescence in adolescents and young adults with perinatally acquired HIV infection receiving cART.\n\nMETHODS:\nCCR5 genotype was analysed in 242 patients with vertically transmitted HIV-1 infection from Paediatric Spanish AIDS Research Network Cohort (coRISpe). Proviral HIV-1 DNA was quantified by digital-droplet PCR, and T-cell phenotype was evaluated by flow cytometry in a subset of 24 patients (ten with CCR5<sup>(Δ32/WT)</sup> genotype and 14 with CCR5<sup>(WT/WT)</sup> genotype).\n\nRESULTS:\nTwenty-three patients were heterozygous for the Δ32 genotype but none was homozygous for the mutated CCR5 allele. We observed no difference in the HIV-1 reservoir size (455 and 578 copies of HIV-1 DNA per million CD4<sup>+</sup> T cells in individuals with CCR5<sup>(WT/WT)</sup> and CCR5<sup>(Δ32/WT)</sup> genotypes, respectively; p 0.75) or in the immune activation markers between both genotype groups. However, we found that total HIV-1 DNA in CD4<sup>+</sup> T cells correlated with the percentage of memory CD4<sup>+</sup> T cells: a direct correlation in CCR5<sup>(WT/Δ32)</sup> patients but an inverse correlation in those with the CCR5<sup>(WT/WT)</sup> genotype.\n\nCONCLUSIONS:\nThis finding suggests a differential distribution of the viral reservoir compartment in CCR5<sup>(WT/Δ32)</sup> patients with perinatal HIV infection, which is a characteristic that may affect the design of strategies for reservoir elimination.",
                "citation": "Martínez-Bonet M, González-Serna A, Clemente MI, Morón-López S, Díaz L, Navarro M, Puertas MC, Leal M, Ruiz-Mateos E, Martinez-Picado J, Muñoz-Fernández MA. Relationship between CCR5<sup>(WT/Δ32)</sup> heterozygosity and HIV-1 reservoir size in adolescents and young adults with perinatally acquired HIV-1 infection.. Clinical microbiology and infection : the official publication of the European Society of Clinical Microbiology and Infectious Diseases. 2016;23(5):318-324.",
                "is_relevant": True,
                "PMID": "28042001",
                "PMCID": None,
                "summary": "**Summary:** The abstract does not directly address the percentage of HIV-positive patients who transmit the virus to their children. Instead, it focuses on the role of the CCR5 receptor in HIV-1 reservoir size and immune function in adolescents and young adults with perinatally acquired HIV infection. The study finds no significant difference in HIV-1 reservoir size or immune activation markers between those with different CCR5 genotypes, but notes a differential distribution of the viral reservoir in patients with the CCR5<sup>(WT/Δ32)</sup> genotype.\n\n**Study Design:** Observational cohort study\n\n**Sample Size:** 242 patients for CCR5 genotype analysis; a subset of 24 patients for T-cell phenotype evaluation\n\n**Study Population:** Adolescents and young adults with perinatally acquired HIV infection from the Paediatric Spanish AIDS Research Network Cohort (coRISpe)\n\n**Risk of Bias:** Potential risks of bias include selection bias, as the study is limited to a specific cohort, and measurement bias, as the study relies on specific laboratory techniques like digital-droplet PCR and flow cytometry, which may have inherent variability. Additionally, the small subset size for T-cell phenotype evaluation may limit the generalizability of those specific findings.",
                "PMCID_path": None
                }
            ]
        },
        status_code=status.HTTP_200_OK,
    )
