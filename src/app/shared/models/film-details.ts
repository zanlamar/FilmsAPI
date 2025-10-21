import { Film } from "./film-basic";

export interface Genre {
    id: number;
    name: string;
}

export interface FilmDetail {
    id: number;
    title: string;
    poster_path: string | null;
    overview: string;
    original_language: string;
    release_date: string;
    vote_average: number;
    genres: Genre[];
}

export interface FilmCredits {
    id?: number
    cast: APIResponseCast[]
}

export interface APIResponseCast {
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path?: string
    cast_id: number
    character: string
    credit_id: string
    order: number
}

export interface APIresponseRecommended {
    page: number
    results: Film[]
    total_pages: number
    total_results: number
}

