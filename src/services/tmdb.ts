import type { Movie, TMDBListResponse } from '../types';

const BASE = 'https://api.themoviedb.org/3';
const KEY = '8265bd1679663a7ea12ac168da84d2e8';

const get = <T>(path: string, params: Record<string, string> = {}): Promise<T> => {
  const q = new URLSearchParams({ api_key: KEY, ...params }).toString();
  return fetch(`${BASE}${path}?${q}`).then((r) => {
    if (!r.ok) throw new Error(`TMDB error: ${r.status}`);
    return r.json() as Promise<T>;
  });
};

export const tmdbService = {
  getTrending: () => get<TMDBListResponse>('/trending/movie/week'),
  getNowPlaying: () => get<TMDBListResponse>('/movie/now_playing'),
  searchMovies: (query: string) => get<TMDBListResponse>('/search/movie', { query }),
  getMovie: (id: string) =>
    get<Movie>(`/movie/${id}`, { append_to_response: 'credits' }),
};
