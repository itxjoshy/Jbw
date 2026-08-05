import { getImageUrl } from "../api/tmdb";

function MovieCard({ movie, rank }) {
  if (!movie) return null;

  return (
    <div className={`movie-card ${rank ? "movie-card--ranked" : ""}`}>
      {rank && <span className="movie-rank">{rank}</span>}

      <div className="movie-poster">
        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          loading="lazy"
        />

        {movie.isRecentlyAdded && (
          <span className="recently-added-tag">Recently Added</span>
        )}

        <div className="movie-hover-actions">
          <button aria-label="Play">▶</button>
          <button aria-label="Add to My List">＋</button>
          <button aria-label="Like">👍</button>
          <button aria-label="More info">˅</button>
        </div>
      </div>

      {movie.progress && (
        <div className="movie-progress">
          <div
            className="movie-progress-fill"
            style={{ width: `${movie.progress}%` }}
          />
        </div>
      )}

      <div className="movie-info">
        <strong>{movie.title}</strong>
        <span>{Math.round(movie.vote_average * 10)}% Match</span>
      </div>
    </div>
  );
}

export default MovieCard;
