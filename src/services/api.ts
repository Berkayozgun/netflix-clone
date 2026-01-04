import axios from 'axios';
import { APIResponse, Movie } from './types';

const API_KEY = "9030e02c98db26eb8794fd00c7fa10a5";
const BASE_URL = "https://api.themoviedb.org/3";

// Create axios instance
const api = axios.create({
    baseURL: BASE_URL,
});

export const requests = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
};

export const StreamFlowApi = {
    // Generic fetcher
    get: async <T = Movie>(url: string): Promise<APIResponse<T>> => {
        const response = await api.get(url);
        return response.data;
    },

    // Specific methods (optional, but good for typed usage)
    getTrending: () => StreamFlowApi.get(requests.fetchTrending),
    getNetflixOriginals: () => StreamFlowApi.get(requests.fetchNetflixOriginals),
    getTopRated: () => StreamFlowApi.get(requests.fetchTopRated),
    getActionMovies: () => StreamFlowApi.get(requests.fetchActionMovies),
    getComedyMovies: () => StreamFlowApi.get(requests.fetchComedyMovies),
    getHorrorMovies: () => StreamFlowApi.get(requests.fetchHorrorMovies),
    getRomanceMovies: () => StreamFlowApi.get(requests.fetchRomanceMovies),
    getDocumentaries: () => StreamFlowApi.get(requests.fetchDocumentaries),
};

export default api;
