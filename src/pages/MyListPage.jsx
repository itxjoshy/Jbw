import MovieCard from '../components/MovieCard';
import { movies } from '../data/movies';

function MyListPage() {
  return (
    <div className="page mylist-page">
      <div className="mylist-header">
        <h1>My List</h1>
        <p>Saved titles for later viewing.</p>
      </div>
      <div className="mylist-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default MyListPage;
