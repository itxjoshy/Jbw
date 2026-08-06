import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../assets/homehero.png";
import logo from "../assets/logo.svg";
import VideoPlayer from "../components/VideoPlayer";
import {
  fetchTrending,
  fetchPopular,
  fetchTopRated,
  fetchUpcoming,
  fetchByGenre,
  getImageUrl,
  GENRES,
} from "../api/tmdb";
import MovieRow from "../components/MovieRow";

function HomePage() {
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [hero, setHero] = useState(null);
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    async function load() {
      const [
        trending,
        popular,
        topRated,
        upcoming,
        action,
        comedy,
        romance,
        scifi,
      ] = await Promise.all([
        fetchTrending(),
        fetchPopular(),
        fetchTopRated(),
        fetchUpcoming(),
        fetchByGenre(GENRES.action),
        fetchByGenre(GENRES.comedy),
        fetchByGenre(GENRES.romance),
        fetchByGenre(GENRES.scifi),
      ]);

      setRows([
        { title: "Trending Now", items: trending.results, ranked: true },
        { title: "Popular on Netflix", items: popular.results },
        { title: "Top Rated", items: topRated.results },
        { title: "Upcoming", items: upcoming.results },
        { title: "Action & Adventure", items: action.results },
        { title: "Comedies", items: comedy.results },
        { title: "Romance", items: romance.results },
        { title: "Sci-Fi", items: scifi.results },
      ]);
    }
    load();
  }, []);

  return (
    <div className="page home-page">
      <nav className={`app-navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-left">
          <div className="logo">
            <img src={logo} alt="Netflix" className="logo" />
          </div>
          <div className="nav-links">
            {["Home", "TV Shows", "Movies", "New & Popular", "My List"].map(
              (link) => (
                <button
                  key={link}
                  className={active === link ? "nav-link active" : "nav-link"}
                  onClick={() => setActive(link)}
                >
                  {link}
                </button>
              ),
            )}
          </div>
        </div>
        <div className="nav-actions">
          <button className="icon-button">
            <span
              className="material-symbols-outlined"
              onClick={() => navigate("/search")}
            >
              search
            </span>
          </button>
          <span className="nav-kids">Kids</span>
          <button className="icon-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" />
            </svg>
          </button>
          <div
            className="profile-dropdown"
            onClick={() => navigate("/profile")}
          >
            <span className="profile-dot" />
            <span className="caret">▾</span>
          </div>
        </div>
      </nav>

      <header
        className="hero-banner"
        style={{
          backgroundImage: `url(${bg})`,
        }}
      >
        <div className="hero-gradient" />
        <div className="hero-details">
          <h1>Princess : Chapter 20</h1>
          <p className="hero-overview">
            Turning 20 changes everything. Follow Princess as she enters a
            brand-new season filled with growth, adventures, laughter, and
            unforgettable moments. Rated ★★★★★ by everyone lucky enough to know
            her.
          </p>
          <div className="hero-buttons">
            <button
              className="button button--primary"
              onClick={() => navigate("/watch")}
            >
              ▶ Play
            </button>
            <button className="button button--ghost">ⓘ More Info</button>
          </div>
        </div>
      </header>

      <main className="movie-sections">
        {rows.map((row) => (
          <MovieRow
            key={row.title}
            title={row.title}
            items={row.items}
            ranked={row.ranked}
          />
        ))}
      </main>
    </div>
  );
}

export default HomePage;
