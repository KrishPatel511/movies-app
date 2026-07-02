export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
  genre_ids?: number[];
  runtime?: number;
  tagline?: string;
  genres?: Genre[];
  credits?: { cast: CastMember[] };
}

export interface Genre {
  id: number;
  name: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
}

export interface TMDBListResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
  page: number;
}

export interface Booking {
  id: number;
  movieId: number;
  title: string;
  poster: string | null;
  seat: string;
  date: string;
  bookedAt: string;
}
