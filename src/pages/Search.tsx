import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { tmdbService } from '../services/tmdb';
import MovieCard from '../components/MovieCard';

export default function Search() {
  const [params] = useSearchParams();
  const q = params.get('q') ?? '';

  const { data, isLoading, isError } = useQuery({
    queryKey: ['search', q],
    queryFn: () => tmdbService.searchMovies(q),
    enabled: q.trim().length > 0,
    staleTime: 2 * 60 * 1000,
  });

  return (
    <div className="page">
      <h2>Search results for: <em>"{q}"</em></h2>
      {isLoading && <div className="loader">Searching...</div>}
      {isError && <div className="error-msg">Search failed. Please try again.</div>}
      {!isLoading && data?.results.length === 0 && <p className="empty-msg">No movies found for "{q}".</p>}
      <div className="grid">
        {data?.results.map((m) => <MovieCard key={m.id} movie={m} />)}
      </div>
    </div>
  );
}
