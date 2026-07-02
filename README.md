# 🎬 CineBook — Movie Booking App

A modern movie browsing and ticket booking web app built with React, TypeScript, and the TMDB API. Browse trending movies, search for any title, view full details, and book seats — all in one place.

---

## 🚀 Live Features

- **Home Page** — Displays trending movies of the week and currently now-playing titles
- **Movie Detail Page** — Full movie info including rating, runtime, genres, tagline, cast, and overview
- **Seat Booking** — Interactive seat selector with date picker across 5 upcoming show dates
- **My Bookings** — View and cancel all your booked tickets, persisted across sessions
- **Search** — Real-time movie search powered by the TMDB API
- **Error Boundary** — Graceful error handling across the entire app

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 |
| Language | TypeScript 6 |
| Build Tool | Vite 8 |
| Routing | React Router DOM v7 |
| Server State | TanStack React Query v5 |
| Client State | Zustand v5 (with persistence) |
| API | TMDB (The Movie Database) |
| Linting | Oxlint |
| Formatting | Prettier |

---

## 📁 Project Structure

```
movies-app/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── ErrorBoundary/     # Global error boundary
│   │   ├── MovieCard.tsx      # Reusable movie card component
│   │   └── Navbar.tsx         # Top navigation bar
│   ├── constants/
│   │   └── index.ts           # TMDB base URLs, seat layout, show dates
│   ├── hooks/
│   │   └── useDebounce.ts     # Debounce hook for search input
│   ├── pages/
│   │   ├── Home.tsx           # Trending + Now Playing sections
│   │   ├── MovieDetail.tsx    # Movie info + seat booking UI
│   │   ├── Search.tsx         # Search results page
│   │   └── Bookings.tsx       # User's booking history
│   ├── services/
│   │   └── tmdb.ts            # TMDB API service layer
│   ├── store/
│   │   └── bookingStore.ts    # Zustand store for bookings (persisted)
│   ├── types/
│   │   └── index.ts           # TypeScript interfaces
│   ├── App.tsx                # Root component with routing setup
│   ├── main.tsx               # App entry point
│   └── index.css              # Global styles
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/KrishPatel511/movies-app.git
cd movies-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be running at `http://localhost:5173`

---

## 📜 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint for code linting |
| `npm run format` | Format source files with Prettier |

---

## 🔑 API

This app uses the [TMDB API](https://www.themoviedb.org/documentation/api). The following endpoints are used:

- `GET /trending/movie/week` — Trending movies
- `GET /movie/now_playing` — Now playing movies
- `GET /movie/:id?append_to_response=credits` — Movie details with cast
- `GET /search/movie?query=` — Search movies

---

## 💾 Booking Persistence

Bookings are saved to `localStorage` via Zustand's `persist` middleware under the key `cinebook-bookings`. They survive page refreshes and browser restarts.

---

## 📸 Pages Overview

| Page | Route | Description |
|---|---|---|
| Home | `/` | Trending & Now Playing movies |
| Movie Detail | `/movie/:id` | Full details + seat booking |
| Search | `/search?q=` | Search results |
| My Bookings | `/bookings` | All booked tickets |
