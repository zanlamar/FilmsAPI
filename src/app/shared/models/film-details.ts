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

export interface APIcastResponse {
    id: number;
    cast: [
        {
            name: string;
            character: string;
            poster_path: string;
        }
    ]
}


