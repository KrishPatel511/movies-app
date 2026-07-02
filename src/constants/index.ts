export const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';
export const TMDB_BACKDROP_BASE = 'https://image.tmdb.org/t/p/original';
export const PLACEHOLDER_POSTER = 'https://placehold.co/200x300?text=No+Image';
export const PLACEHOLDER_SMALL = 'https://placehold.co/80x120?text=N/A';

export const SEATS = ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4', 'C1', 'C2', 'C3', 'C4'];

export const SHOW_DATES: string[] = Array.from({ length: 5 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() + i);
  return d.toDateString();
});
