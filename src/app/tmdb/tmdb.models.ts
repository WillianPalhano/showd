export interface TmdbSearchResponse {
  page: number;
  results: TmdbTvResult[];
  total_pages: number;
  total_results: number;
}

export interface TmdbTvResult {
  id: number;
  name: string;
  first_air_date: string;
  poster_path: string | null;
  overview: string;
}