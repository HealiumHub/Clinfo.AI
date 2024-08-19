import { ClinfoResponse } from '@/api/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LinkIcon } from 'lucide-react';
import React from 'react'
import ReactMarkdown from 'react-markdown';

const mockResult: ClinfoResponse = {
    synthesis: {
        content:
            "**Literature Summary:** The provided articles do not offer comprehensive data on the overall prevalence of COVID-19 in the United States. The most relevant study, an observational analysis, noted higher COVID-19 prevalence among adolescents and youth compared to older adults during the summer of 2020 in six U.S. states, indicating a higher transmission potential in these younger age groups (Dong et al.). However, this study only covers specific states and demographics, limiting its generalizability to the entire U.S. population. Other articles focus on different aspects of COVID-19, such as racial and ethnic disparities in infection rates (WHO Health Emergency Dashboard) or do not address the prevalence of COVID-19 directly.\n\n**TL;DR:** The articles do not provide a definitive answer to the prevalence of COVID-19 in the United States, with only limited data available for specific demographics and regions.\n\n",
        citations: [
            {
                index: 1,
                url: "https://pubmed.ncbi.nlm.nih.gov/38689398/",
                text: "Villemagne VL, Burnham S, Bourgeat P, et al. Amyloid ß deposition, neurodegeneration, and cognitive decline in sporadic Alzheimer's disease: A prospective cohort study. Lancet Neurol. 2013;12(4):357‐367.",
            },
            {
                index: 2,
                url: "https://pubmed.ncbi.nlm.nih.gov/36567444/",
                text: "Karlsson EA, Mook PAN, Vandemaele K, et al. Review of global influenza circulation, late 2019 to 2020, and the impact of the COVID‐19 pandemic on influenza circulation. Wkly Epidemiol Rec. 2021;96:241‐264.",
            },
            {
                index: 3,
                url: "https://pubmed.ncbi.nlm.nih.gov/32711058/",
                text: "Esper F.P., Spahlinger T., Zhou L. Rate and influence of respiratory virus co-infection on pandemic (H1N1) influenza disease. J Infect. 2011;63:260–266.",
            },
            {
                index: 4,
                url: "https://pubmed.ncbi.nlm.nih.gov/34311990/",
                text: "Team EE. Note from the editors: World Health Organization declares novel coronavirus (2019-nCoV) sixth public health emergency of international concern. Euro Surveill. 2020;25",
            },
            {
                index: 5,
                url: "https://pubmed.ncbi.nlm.nih.gov/35397851/",
                text: "Hu J, Peng P, Cao X, et al. Increased immune escape of the new SARS-CoV-2 variant of concern omicron. Cell Mol Immunol. 2022;19:293–295.",
            },
            {
                index: 6,
                url: "https://pubmed.ncbi.nlm.nih.gov/35105535/",
                text: "Gardner EA, McGrath SA, Dowling D, Bai D. The Opioid Crisis: Prevalence and Markets of Opioids.. Forensic science review. 2022;34(1):43-70.",
            },
            {
                index: 7,
                url: "https://pubmed.ncbi.nlm.nih.gov/33349955/",
                text: "Chen H, Chen G, Zheng X, Guo Y. Contribution of specific diseases and injuries to changes in health adjusted life expectancy in 187 countries from 1990 to 2013: retrospective observational study. BMJ. 2019;27(364):l969.",
            },
            {
                index: 8,
                url: "https://pubmed.ncbi.nlm.nih.gov/34762110/",
                text: "WHO Health Emergency Dashboard . Accessed October 12, 2021. https://extranet.who.int/publicemergency",
            },
        ],
    },
    translate_synthesis: "This is a translated synthesis",
    article_summaries: [
        {
            title: "Article 1",
            summary: "This is a summary",
            url: "https://www.google.com",
            abstract:
                "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
            citation: "citation",
            is_relevant: true,
            PMID: "PMID",
        },
        {
            title: "Article 2",
            summary: "This is a summary",
            url: "https://www.google.com",
            abstract:
                "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
            citation: "citation",
            is_relevant: true,
            PMID: "PMID",
        },
        {
            title: "Article 3",
            summary: "This is a summary",
            url: "https://www.google.com",
            abstract:
                "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
            citation: "citation",
            is_relevant: true,
            PMID: "PMID",
        },
        {
            title: "Article 4",
            summary: "This is a summary",
            url: "https://www.google.com",
            abstract:
                "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
            citation: "citation",
            is_relevant: true,
            PMID: "PMID",
        },
    ],
};


type Props = {
    result: ClinfoResponse
}

const ResponseSection: React.FC<Props> = ({ result = mockResult }) => {
    return (
        <div className="flex flex-col items-center pt-10">
            <Card className='bg-muted/40 max-w-4xl'>
                <CardHeader>
                    <CardTitle className="text-left">Synthesis</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription className="text-left flex flex-col gap-4">
                        <ReactMarkdown className=' text-primary'>{result.synthesis.content}</ReactMarkdown>
                        {result.synthesis.citations.map((citation) => (
                            <div
                                key={citation.url}
                                className="flex flex-col gap-2 border-l-2 border-red-400 pl-2 hover:-translate-x-3 hover:cursor-pointer hover:opacity-80 transition-all text-muted-foreground"
                            >
                                <a
                                    href={citation.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {citation.text}
                                </a>
                            </div>
                        ))}
                    </CardDescription>
                </CardContent>
            </Card>

            <Card className="mt-3">
                <CardHeader>
                    <CardTitle className="text-left">Articles</CardTitle>
                </CardHeader>
                <CardContent>
                    {result.article_summaries.map((article) => {
                        return (
                            <Card className="mb-3">
                                <CardHeader>
                                    <a
                                        href={article.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <CardTitle className="flex gap-2 items-center hover:opacity-75 hover:cursor-pointer transition-all">
                                            <h1 className="text-left">{article.title}</h1>
                                            <LinkIcon className="h-4 w-4" />
                                        </CardTitle>
                                    </a>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>
                                        <div className="flex flex-col gap-1">
                                            <div className="text-left">
                                                <p className="font-semibold text-red-400">Aritcle ID</p>
                                                <p className="">{article.PMID}</p>
                                            </div>
                                            <div className="text-left">
                                                <p className="font-semibold text-red-400">Summary</p>
                                                <ReactMarkdown className="">
                                                    {article.summary}
                                                </ReactMarkdown>
                                            </div>
                                            <div className="text-left">
                                                <p className="font-semibold text-red-400">Abstract</p>
                                                <p className="">{article.abstract}</p>
                                            </div>
                                            <div className="text-left">
                                                <p className="font-semibold text-red-400">Citation</p>
                                                <p className="">{article.citation}</p>
                                            </div>
                                        </div>
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        );
                    })}
                </CardContent>
            </Card>
        </div>
    );
}

export default ResponseSection