import { ClinfoResponse } from "@/api/types";
import React from "react";

interface ResultProps {
  result: ClinfoResponse;
}

const Result: React.FC<ResultProps> = ({ result }) => {
  return (
    <div>
      {result.synthesis}
      {result.article_summaries.map((article) => {
        return (
          <div>
            <h1>{article.title}</h1>
            <p>{article.summary}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Result;
