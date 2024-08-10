import { useQuery } from "@tanstack/react-query";
import { ClinfoResponse } from "./types";

const fetchSearch = async (query: string) => {
  const response = await fetch(`localhost:8001/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question: query }),
  });

  return response.json() as Promise<ClinfoResponse>;
};

export const useSearchQuery = (query: string) => {
  return useQuery({
    queryKey: ["search", query],
    queryFn: async () => {
      return await fetchSearch(query);
    },
  });
};
