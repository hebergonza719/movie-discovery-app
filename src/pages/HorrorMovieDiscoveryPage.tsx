import { useEffect, useState } from 'react';
import type { Movie, TmdbResponse } from '../types/movie-discovery-page';
import MovieCard from '../components/MovieCard';

const ASCENDING = 'ascending';
const DESCENDING = 'descending';

const baseUrl = import.meta.env.VITE_TMDB_BASE_URL;
const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const url = `${baseUrl}/3/discover/movie?api_key=${apiKey}&with_genres=27&sort_by=popularity.desc`;

async function fetchMovies() {
  try {
    const response = await fetch(url, { method: 'GET' });

    if (!response.ok) {
      throw new Error(`HTTP error status: ${response.status}`);
    }

    const data: TmdbResponse = await response.json();

    return data.results;
  } catch (error) {
    // complete this
  }
}

export default function HorrorMovieDiscoveryPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filterValue, setFilterValue] = useState('descending');

  useEffect(() => {
    async function loadMovies() {
      const data = (await fetchMovies()) ?? [];
      setMovies(data);
    }

    loadMovies();
  }, []);

  const sortedMovies = [...movies].sort((a, b) => {
    // positive: b before a | negative: a before b
    if (!a.release_date) {
      return b.release_date ? 1 : 0;
    }

    if (!b.release_date) {
      return -1;
    }

    return filterValue === 'ascending'
      ? a.release_date.localeCompare(b.release_date)
      : b.release_date.localeCompare(a.release_date);
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold">
        20 Of The Best Horror Movies To Watch This Halloween
      </h1>

      <label htmlFor="release-date-select">Release Date:</label>
      <select
        value={filterValue}
        onChange={(e) => {
          const value = e.currentTarget.value;
          setFilterValue(value);
        }}
        id="release-date-select"
      >
        <option value={DESCENDING}>Most Recent</option>
        <option value={ASCENDING}>Oldest</option>
      </select>

      {sortedMovies.length > 0 ? (
        <>
          {sortedMovies.map((movie) => {
            return <MovieCard key={movie.id} movie={movie} />;
          })}
        </>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
}
