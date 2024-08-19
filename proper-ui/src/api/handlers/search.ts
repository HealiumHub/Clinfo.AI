// export const searchAbstract = async () => {
// 	const res = await fetch('http://localhost:8001/search');
// 	return res.json();
// };

import axios, { AxiosError, AxiosRequestHeaders, AxiosResponse } from 'axios';
import queryString from 'query-string';
import { ClinfoResponse, ClinfoResponseAnalyzeFiles } from '../types';
import { mock } from 'node:test';

const AxiosClient = axios.create({
	baseURL: 'http://localhost:8001',
	timeout: 500000,
	headers: {
		'Content-Type': 'application/json',
	},
	paramsSerializer: (params) => queryString.stringify(params),
});

const ClinfoAPI = {
	searchAbstract: async (question: string) => {
		return AxiosClient.post<ClinfoResponse>(`/search`, {
			question: question,
		});
	},
	mockSearchAbstract: async (question: string) => {
		return AxiosClient.post<ClinfoResponse>(`/mock/search`, {
			question: question,
		});
	},
	searchAnalyzeFiles: async (question: string) => {
		return AxiosClient.post<ClinfoResponseAnalyzeFiles>(`/search/follow-up`, {
			question: question,
		});
	},
	mockSearchAnalyzeFiles: async (question: string) => {
		return AxiosClient.post<ClinfoResponseAnalyzeFiles>(`/mock/search/follow-up`, {
			question: question,
		});
	},
};

export default ClinfoAPI;
