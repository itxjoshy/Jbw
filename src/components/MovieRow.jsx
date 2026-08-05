import { useRef } from "react";
import MovieCard from "./MovieCard";

function MovieRow({ title, items = [], ranked }) {
  const rowRef = useRef(null);

  const scrollRow = (direction) => {
    if (!rowRef.current) return;
    rowRef.current.scrollBy({ left: direction * 600, behavior: "smooth" });
  };

  return (
    <section className="movie-row">
      <div className="row-header">
        <h2>{title}</h2>
        <a href="#" className="row-explore">
          Explore All
        </a>
      </div>

      <div className="row-wrapper">
        <button
          className="row-arrow row-arrow--left"
          onClick={() => scrollRow(-1)}
        >
          ‹
        </button>
        <div className="row-cards" ref={rowRef}>
          {items.map((movie, index) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              rank={ranked ? index + 1 : undefined}
            />
          ))}
        </div>
        <button
          className="row-arrow row-arrow--right"
          onClick={() => scrollRow(1)}
        >
          ›
        </button>
      </div>
    </section>
  );
}

export default MovieRow;
