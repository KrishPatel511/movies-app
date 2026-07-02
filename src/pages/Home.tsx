import { useQuery } from '@tanstack/react-query';
import { tmdbService } from '../services/tmdb';
import MovieCard from '../components/MovieCard';

export default function Home() {
  const trending = useQuery({ queryKey: ['trending'], queryFn: tmdbService.getTrending, staleTime: 5 * 60 * 1000 });
  const nowPlaying = useQuery({ queryKey: ['nowPlaying'], queryFn: tmdbService.getNowPlaying, staleTime: 5 * 60 * 1000 });

  const isLoading = trending.isLoading || nowPlaying.isLoading;
  const isError = trending.isError || nowPlaying.isError;

  if (isLoading) return <div className="loader">Loading movies...</div>;
  if (isError) return <div className="error-msg">Failed to load movies. Please try again.</div>;

  return (
    <div className="page">
      <section>
        <h2>🔥 Trending This Week</h2>
        <div className="grid">
          {trending.data?.results.slice(0, 8).map((m) => <MovieCard key={m.id} movie={m} />)}
        </div>
      </section>
      <section>
        <h2>🎭 Now Playing</h2>
        <div className="grid">
          {nowPlaying.data?.results.slice(0, 8).map((m) => <MovieCard key={m.id} movie={m} />)}
        </div>
      </section>
    </div>
  );
}
