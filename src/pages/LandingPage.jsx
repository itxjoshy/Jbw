import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Accordion from "../components/Accordion";
import MovieCard from "../components/MovieCard";
import SectionFeature from "../components/SectionFeature";
import logo from "../assets/logo.svg";
import { faqs } from "../data/faqs";
import { movies } from "../data/movies";

const features = [
  {
    title: "Enjoy on your TV",
    description:
      "Stream on your big screen with crisp clarity and seamless playback.",
    variant: "tv",
  },
  {
    title: "Download your shows",
    description: "Save favorites and watch offline anytime, anywhere.",
    variant: "download",
  },
  {
    title: "Watch everywhere",
    description: "Your account works on phones, tablets, laptops, and TVs.",
    variant: "devices",
  },
  {
    title: "Kids profiles",
    description: "Create a space just for kids with fun character icons.",
    variant: "kids",
  },
];

function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const carouselRef = useRef(null);

  const slideFeatured = (direction) => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({ left: direction * 240, behavior: "smooth" });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="page landing-page">
      <button className="tag">
        <p>New to Netflix? Try 7 days for ₦0.</p>
      </button>

      <main>
        <section className="hero-section">
          <header className="hero-navbar">
            <div className="logo">
              <img src={logo} alt="Netflix" />
            </div>
            <button
              className="button button"
              onClick={() => navigate("/onboarding")}
            >
              Sign In
            </button>
          </header>
          <div className="hero-section-content">
            <div className="hero-overlay" />
            <div className="hero-copy">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Unlimited movies, TV shows, and more.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Watch anywhere. Cancel anytime.
              </motion.p>
              <motion.div
                className="hero-actions"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <label
                  className={`input-float ${email ? "input-float--active" : ""}`}
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder=" "
                  />
                  <span>Email address</span>
                </label>
                <button
                  className="button button--primary"
                  onClick={() => navigate("/onboarding")}
                >
                  Get Started
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        <section className="featured-row">
          <div className="row-header">
            <h2>Trending Now</h2>
            <div>
              <button className="row-arrow" onClick={() => slideFeatured(-1)}>
                ‹
              </button>
              <button className="row-arrow" onClick={() => slideFeatured(1)}>
                ›
              </button>
            </div>
          </div>
          <div className="row-cards" ref={carouselRef}>
            {["1", "2", "3", "4", "5"].map((id, index) => {
              const film = movies.find((item) => item.id === id);
              return <MovieCard key={id} movie={film} rank={index + 1} />;
            })}
          </div>
        </section>

        <div className="section-divider" />

        {features.map((feature, index) => (
          <SectionFeature
            key={feature.title}
            feature={feature}
            reverse={index % 2 === 1}
          />
        ))}

        <section className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="accordion-list">
            {faqs.map((faq) => (
              <Accordion
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
          <div className="hero-actions faq-bottom">
            <label
              className={`input-float ${email ? "input-float--active" : ""}`}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
              />
              <span>Email address</span>
            </label>
            <button
              className="button button--primary"
              onClick={() => navigate("/onboarding")}
            >
              Get Started
            </button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-links-grid">
          {[
            "FAQ",
            "Help Center",
            "Privacy",
            "Security",
            "Contact Us",
            "Jobs",
            "Terms of Use",
            "Corporate Info",
            "Media Center",
            "Buy Gift Cards",
            "Cookie Preferences",
            "Legal Notices",
          ].map((link) => (
            <a key={link} href="#">
              {link}
            </a>
          ))}
        </div>
        <div className="footer-settings">
          <select className="select-language">
            <option>English</option>
            <option>Español</option>
            <option>Français</option>
          </select>
          <span>Netflix clone for birthday surprise.</span>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
