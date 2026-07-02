import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Booking, Movie } from '../types';

interface BookingStore {
  bookings: Booking[];
  book: (movie: Movie, seat: string, date: string) => Booking;
  cancel: (id: number) => void;
}

export const useBookingStore = create<BookingStore>()(
  persist(
    (set) => ({
      bookings: [],
      book: (movie, seat, date) => {
        const entry: Booking = {
          id: Date.now(),
          movieId: movie.id,
          title: movie.title,
          poster: movie.poster_path,
          seat,
          date,
          bookedAt: new Date().toLocaleString(),
        };
        set((s) => ({ bookings: [...s.bookings, entry] }));
        return entry;
      },
      cancel: (id) => set((s) => ({ bookings: s.bookings.filter((b) => b.id !== id) })),
    }),
    { name: 'cinebook-bookings' }
  )
);
