import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { useBookingStore } from '../store/bookingStore';

export default function Navbar() {
  const [q, setQ] = useState('');
  const debounced = useDebounce(q, 400);
  const nav = useNavigate();
  const count = useBookingStore((s) => s.bookings.length);

  useEffect(() => {
    if (debounced.trim()) nav(`/search?q=${encodeURIComponent(debounced.trim())}`);
  }, [debounced, nav]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) { nav(`/search?q=${encodeURIComponent(q.trim())}`); setQ(''); }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">🎬 CineBook</Link>
      <form onSubmit={onSubmit} className="search-form">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search movies..."
          aria-label="Search movies"
        />
        <button type="submit">Search</button>
      </form>
      <Link to="/bookings" className="nav-link">
        My Bookings {count > 0 && <span className="badge">{count}</span>}
      </Link>
    </nav>
  );
}
