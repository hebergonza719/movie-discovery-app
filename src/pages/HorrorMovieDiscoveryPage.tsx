import { useEffect, useState } from 'react';
import type { Movie, TmdbResponse } from '../types/movie-discovery-page';

const baseUrl = import.meta.env.VITE_TMDB_BASE_URL;
const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const url = `${baseUrl}/3/discover/movie?api_key=${apiKey}&with_genres=27`;

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

  useEffect(() => {
    async function loadMovies() {
      const data = (await fetchMovies()) ?? [];
      console.log(data);
      setMovies(data);
    }

    loadMovies();
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold">
        20 Of The Best Horror Movies To Watch This Halloween
      </h1>
    </main>
  );
}
