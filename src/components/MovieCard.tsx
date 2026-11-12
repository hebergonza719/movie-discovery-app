import type { Movie } from '../types/movie-discovery-page';

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <div className="flex border-2 p-2 max-w-full h-[400px] rounded-lg border-zinc-700 hover:border-red-600 motion-safe:transition motion-safe:duration-1000 flex-col">
      <div className="mr-2">
        <div>
          <span className="font-bold">Title: </span>
          <span>{movie.title}</span>
        </div>
        <div className="mb-2">
          <span className="font-bold">Release date: </span>
          <span>{movie.release_date || 'Release year unknown'}</span>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 items-start gap-2">
        <div
          tabIndex={0}
          className="border border-black rounded h-full min-w-0 flex-1 overflow-y-auto p-1"
        >
          <span className="font-bold">Description: </span>
          <span className="text-sm">
            {movie.overview || 'Description not available'}
          </span>
        </div>

        {movie.poster_path ? (
          <img
            className="h-60 p-1 w-40 rounded-lg"
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={`movie poster for: ${movie.title}`}
          />
        ) : (
          <div className="border h-60 p-1 w-40 rounded-lg mx-auto content-center">
            Poster unavailable
          </div>
        )}
      </div>
    </div>
  );
}
