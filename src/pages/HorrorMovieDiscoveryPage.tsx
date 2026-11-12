import { useEffect, useState } from 'react';
import type { Movie, TmdbResponse } from '../types/movie-discovery-page';
import MovieCard from '../components/MovieCard';

const ASCENDING = 'ascending';
const DESCENDING = 'descending';

const baseUrl = import.meta.env.VITE_TMDB_BASE_URL;
const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const url = `${baseUrl}/3/discover/movie?api_key=${apiKey}&with_genres=27&sort_by=popularity.desc`;

async function fetchMovies() {
  const response = await fetch(url, { method: 'GET' });

  if (!response.ok) {
    throw new Error(`HTTP error status: ${response.status}`);
  }

  const data: TmdbResponse = await response.json();

  return data.results;
}

export default function HorrorMovieDiscoveryPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filterValue, setFilterValue] = useState('descending');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      try {
        const data = await fetchMovies();
        setMovies(data);
      } catch (error) {
        console.error(`HorrorMovieDiscoveryPage - Error: ${error} `);
        setError('There was an issue fetching movie data');
      } finally {
        setIsLoading(false);
      }
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

  function renderMovies() {
    if (error) {
      return (
        <div>
          <p>{error}</p>
        </div>
      );
    }

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (sortedMovies.length < 1) {
      return <div>No horror movies found.</div>;
    }

    return (
      <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedMovies.map((movie) => {
          return <MovieCard key={movie.id} movie={movie} />;
        })}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl py-8 px-2 xl:px-0">
      <h1 className="text-3xl font-bold">
        20 Of The Most Popular Horror Movies To Watch This Halloween
      </h1>
      <div className="my-2 justify-self-end">
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
      </div>

      {renderMovies()}
    </div>
  );
}
