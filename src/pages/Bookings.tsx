import { useNavigate } from 'react-router-dom';
import { useBookingStore } from '../store/bookingStore';
import { TMDB_IMAGE_BASE, PLACEHOLDER_SMALL } from '../constants';

export default function Bookings() {
  const { bookings, cancel } = useBookingStore();
  const nav = useNavigate();

  if (bookings.length === 0) {
    return (
      <div className="page">
        <h2>My Bookings</h2>
        <div className="empty-state">
          <p>🎬 No bookings yet.</p>
          <button className="book-btn" style={{ width: 'auto', marginTop: '1rem' }} onClick={() => nav('/')}>
            Browse Movies
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h2>🎟 My Bookings <span className="badge">{bookings.length}</span></h2>
      <div className="bookings-list">
        {bookings.map((b) => (
          <div key={b.id} className="booking-card">
            <img src={b.poster ? TMDB_IMAGE_BASE + b.poster : PLACEHOLDER_SMALL} alt={b.title} />
            <div className="booking-info">
              <h3>{b.title}</h3>
              <p>📅 {b.date}</p>
              <p>💺 Seat: <strong>{b.seat}</strong></p>
              <p className="booked-at">Booked at: {b.bookedAt}</p>
            </div>
            <button className="cancel-btn" onClick={() => cancel(b.id)}>Cancel</button>
          </div>
        ))}
      </div>
    </div>
  );
}
