import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { tmdbService } from '../services/tmdb';
import { useBookingStore } from '../store/bookingStore';
import { TMDB_IMAGE_BASE, PLACEHOLDER_POSTER, SEATS, SHOW_DATES } from '../constants';
import type { Booking } from '../types';

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const nav = useNavigate();
  const { book, bookings } = useBookingStore();
  const [seat, setSeat] = useState('');
  const [date, setDate] = useState(SHOW_DATES[0]);
  const [confirmed, setConfirmed] = useState<Booking | null>(null);

  const { data: movie, isLoading, isError } = useQuery({
    queryKey: ['movie', id],
    queryFn: () => tmdbService.getMovie(id!),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });

  if (isLoading) return <div className="loader">Loading...</div>;
  if (isError || !movie) return <div className="error-msg">Failed to load movie.</div>;

  const bookedSeats = bookings
    .filter((b) => b.movieId === movie.id && b.date === date)
    .map((b) => b.seat);

  const handleBook = () => {
    if (!seat) return alert('Please select a seat!');
    const entry = book(movie, seat, date);
    setConfirmed(entry);
    setSeat('');
  };

  return (
    <div className="detail-page">
      <button className="back-btn" onClick={() => nav(-1)}>← Back</button>

      <div className="detail-hero">
        <img
          src={movie.poster_path ? TMDB_IMAGE_BASE + movie.poster_path : PLACEHOLDER_POSTER}
          alt={movie.title}
        />
        <div className="detail-info">
          <h1>{movie.title}</h1>
          {movie.tagline && <p className="tagline">"{movie.tagline}"</p>}
          <p className="meta">
            ⭐ {movie.vote_average?.toFixed(1)}
            &nbsp;|&nbsp; {movie.runtime} min
            &nbsp;|&nbsp; {movie.release_date?.slice(0, 4)}
          </p>
          <div className="genres">
            {movie.genres?.map((g) => <span key={g.id} className="genre-tag">{g.name}</span>)}
          </div>
          <p className="overview">{movie.overview}</p>
          {movie.credits?.cast && (
            <p className="cast">
              <strong>Cast:</strong> {movie.credits.cast.slice(0, 5).map((c) => c.name).join(', ')}
            </p>
          )}
        </div>
      </div>

      <div className="booking-box">
        <h2>🎟 Book Tickets</h2>

        <div className="date-row">
          {SHOW_DATES.map((d) => (
            <button
              key={d}
              className={`date-btn${date === d ? ' active' : ''}`}
              onClick={() => { setDate(d); setSeat(''); setConfirmed(null); }}
            >
              {d}
            </button>
          ))}
        </div>

        <h3>Select Seat</h3>
        <div className="seat-legend">
          <span className="legend-item"><span className="seat-dot available" />Available</span>
          <span className="legend-item"><span className="seat-dot selected-dot" />Selected</span>
          <span className="legend-item"><span className="seat-dot taken-dot" />Taken</span>
        </div>
        <div className="seat-grid">
          {SEATS.map((s) => {
            const taken = bookedSeats.includes(s);
            return (
              <button
                key={s}
                className={`seat${taken ? ' taken' : seat === s ? ' selected' : ''}`}
                disabled={taken}
                onClick={() => setSeat(s)}
                aria-label={`Seat ${s}${taken ? ' (taken)' : ''}`}
              >
                {s}
              </button>
            );
          })}
        </div>

        <button className="book-btn" onClick={handleBook} disabled={!seat}>
          Confirm Booking
        </button>

        {confirmed && (
          <div className="confirm-msg">
            ✅ Booked! <strong>{confirmed.title}</strong> — Seat <strong>{confirmed.seat}</strong> on <strong>{confirmed.date}</strong>
          </div>
        )}
      </div>
    </div>
  );
}
