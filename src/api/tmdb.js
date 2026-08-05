const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // put in .env as VITE_TMDB_API_KEY=xxxx
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p";

async function tmdbFetch(path, params = "") {
  const res = await fetch(
    `${BASE_URL}${path}?api_key=${API_KEY}&language=en-US${params}`,
  );
  if (!res.ok) throw new Error(`TMDB error: ${res.status}`);
  return res.json();
}

export const getImageUrl = (path, size = "w500") =>
  path ? `${IMG_BASE}/${size}${path}` : null;

export const fetchTrending = () => tmdbFetch("/trending/movie/week");
export const fetchPopular = () => tmdbFetch("/movie/popular");
export const fetchTopRated = () => tmdbFetch("/movie/top_rated");
export const fetchUpcoming = () => tmdbFetch("/movie/upcoming");
export const fetchByGenre = (genreId) =>
  tmdbFetch(
    "/discover/movie",
    `&with_genres=${genreId}&sort_by=popularity.desc`,
  );

// Netflix-style genre IDs (TMDB standard)
export const GENRES = {
  action: 28,
  comedy: 35,
  romance: 10749,
  scifi: 878,
  horror: 27,
  documentary: 99,
};
