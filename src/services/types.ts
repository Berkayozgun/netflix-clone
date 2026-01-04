export interface Movie {
    id: number;
    title?: string;
    name?: string;
    original_name?: string;
    poster_path: string;
    backdrop_path: string;
    overview: string;
    vote_average: number;
    release_date?: string;
    first_air_date?: string;
    genre_ids: number[];
    popularity: number;
    vote_count: number;
    video?: boolean;
}

export interface TVShow extends Movie {
    // TV specific fields if any, otherwise it shares structure with Movie in TMDB largely
    origin_country?: string[];
}

export interface APIResponse<T> {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
}

export interface VideoDetails {
    key: string;
    site: string;
    type: string;
}
