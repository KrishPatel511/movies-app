import { useNavigate } from 'react-router-dom';
import type { Movie } from '../types';
import { TMDB_IMAGE_BASE, PLACEHOLDER_POSTER } from '../constants';

interface Props {
  movie: Movie;
}

export default function MovieCard({ movie }: Props) {
  const nav = useNavigate();
  return (
    <div className="card" onClick={() => nav(`/movie/${movie.id}`)}>
      <img
        src={movie.poster_path ? TMDB_IMAGE_BASE + movie.poster_path : PLACEHOLDER_POSTER}
        alt={movie.title}
        loading="lazy"
      />
      <div className="card-info">
        <h3>{movie.title}</h3>
        <div className="card-meta">
          <span className="rating">⭐ {movie.vote_average?.toFixed(1)}</span>
          <span className="year">{movie.release_date?.slice(0, 4)}</span>
        </div>
      </div>
    </div>
  );
}
