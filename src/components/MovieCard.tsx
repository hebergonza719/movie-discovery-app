import type { Movie } from '../types/movie-discovery-page';

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <>
      <div>
        <p>Title: {movie.title}</p>
        <p>Release date: {movie.release_date || 'Release year unknown'}</p>
        <p>Description: {movie.overview || 'Description not available'}</p>
      </div>
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={`movie poster for: ${movie.title}`}
        />
      ) : (
        <div>Poster unavailable</div>
      )}
    </>
  );
}
