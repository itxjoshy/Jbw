import { useMemo, useState } from 'react';
import { movies } from '../data/movies';
import MovieCard from '../components/MovieCard';

function SearchPage() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return movies.filter((movie) => movie.title.toLowerCase().includes(normalized) || movie.genre.toLowerCase().includes(normalized));
  }, [query]);

  return (
    <div className="page search-page">
      <div className="search-header">
        <div>
          <h1>Search</h1>
          <p>Find titles, genres, and trending picks.</p>
        </div>
        <div className="search-input-wrap">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for movies or TV shows" />
        </div>
      </div>
      <div className="search-results">
        {filtered.length ? (
          filtered.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <div className="empty-state">No results found for “{query}”.</div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
