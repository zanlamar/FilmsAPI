export interface Film {
  id: number;
  title: string;
  poster_path: string;
  overview?: string;
  release_date?: string;
  vote_average: number;
}

export interface APIResponse {
  results: Film[];
  page: number;
  total_pages: number;
  total_results: number;
}