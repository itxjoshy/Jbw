import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../assets/homehero.png";
import logo from "../assets/logo.svg";
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
          <button className="icon-button">🔍</button>
          <span className="nav-kids">Kids</span>
          <button className="icon-button">🔔</button>
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
          backgroundSize: "120%",
          backgroundPosition: "left center",
          backgroundRepeat: "no-repeat",
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
            <button className="button button--primary">▶ Play</button>
            <button className="button button--ghost">ⓘ More Info</button>
          </div>
        </div>
        <div className="hero-age-badge">
          <span className="hero-rating">HD</span>
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
