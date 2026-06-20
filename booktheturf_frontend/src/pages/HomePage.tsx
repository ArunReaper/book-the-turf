import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllTurfs } from "../api/turfService";
import type { Turf } from "../types/Turf";
import Layout from "../components/Layout";

const sportConfigs = [
  {
    id: "Football",
    name: "Football",
    icon: "⚽",
    gradient: "linear-gradient(135deg, #22c55e, #16a34a)",
    description: "5-a-side, 7-a-side & full pitch",
  },
  {
    id: "Cricket",
    name: "Cricket",
    icon: "🏏",
    gradient: "linear-gradient(135deg, #3b82f6, #2563eb)",
    description: "Box cricket, nets & full match",
  },
  {
    id: "Badminton",
    name: "Badminton",
    icon: "🏸",
    gradient: "linear-gradient(135deg, #a855f7, #7c3aed)",
    description: "Singles & doubles courts",
  },
  {
    id: "Tennis",
    name: "Tennis",
    icon: "🎾",
    gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
    description: "Hard & clay courts",
  },
  {
    id: "Basketball",
    name: "Basketball",
    icon: "🏀",
    gradient: "linear-gradient(135deg, #ef4444, #dc2626)",
    description: "Half & full court",
  },
  {
    id: "Swimming",
    name: "Swimming",
    icon: "🏊",
    gradient: "linear-gradient(135deg, #06b6d4, #0891b2)",
    description: "Lap pools & recreational",
  },
];

function HomePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [featuredTurfs, setFeaturedTurfs] = useState<Turf[]>([]);
  const [stats, setStats] = useState({ turfs: 0, sports: 0, cities: 1 });

  useEffect(() => {
    getAllTurfs()
      .then((data: Turf[]) => {
        setFeaturedTurfs(data.slice(0, 6));
        const sportSet = new Set<string>();
        data.forEach((t) => {
          if (t.sportsType) {
            if (t.sportsType.includes("~")) {
              t.sportsType.split("~").map((s) => s.trim()).filter(Boolean).forEach((s) => sportSet.add(s));
            } else {
              sportSet.add(t.sportsType);
            }
          }
          if (t.sportsTypes?.length) {
            t.sportsTypes.forEach((s) => sportSet.add(s));
          }
        });
        setStats({ turfs: data.length, sports: sportSet.size, cities: 1 });
      })
      .catch(() => {});
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/turfs?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/turfs");
    }
  };

  return (
    <Layout>
      {/* ===== HERO SECTION ===== */}
      <section className="home-hero">
        <div className="home-hero__bg" />
        <div className="home-hero__content">
          <h1 className="home-hero__title">
            Book Your Perfect
            <br />
            <span className="home-hero__highlight">Turf in Minutes</span>
          </h1>
          <p className="home-hero__subtitle">
            Find, compare, and book the best football, cricket, badminton & tennis
            turfs near you.
          </p>

          {/* Search Bar */}
          <form className="home-hero__search" onSubmit={handleSearch}>
            <svg
              className="home-hero__search-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search by turf name, sport, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="home-hero__search-input"
            />
            <button type="submit" className="home-hero__search-btn">
              Search
            </button>
          </form>

          {/* Quick Links */}
          <div className="home-hero__quick-links">
            <span className="home-hero__quick-label">Popular:</span>
            {["Football", "Cricket", "Box Cricket", "Badminton"].map(
              (sport) => (
                <Link
                  key={sport}
                  to={`/turfs?sport=${encodeURIComponent(sport)}`}
                  className="home-hero__quick-link"
                >
                  {sport}
                </Link>
              )
            )}
          </div>

          {/* Stats */}
          <div className="home-hero__stats">
            <div className="home-hero__stat">
              <span className="home-hero__stat-value">{stats.turfs}+</span>
              <span className="home-hero__stat-label">Turfs Listed</span>
            </div>
            <div className="home-hero__stat">
              <span className="home-hero__stat-value">{stats.sports}+</span>
              <span className="home-hero__stat-label">Sports</span>
            </div>
            <div className="home-hero__stat">
              <span className="home-hero__stat-value">{stats.cities}</span>
              <span className="home-hero__stat-label">City</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SPORTS SECTION ===== */}
      <section className="home-section">
        <div className="home-section__container">
          <div className="home-section__header">
            <h2 className="home-section__title">Browse by Sport</h2>
            <p className="home-section__subtitle">
              Choose from a wide range of sports and find the perfect venue
            </p>
          </div>

          <div className="home-sports-grid">
            {sportConfigs.map((sport) => (
              <Link
                key={sport.id}
                to={`/turfs?sport=${encodeURIComponent(sport.name)}`}
                className="home-sport-card"
                style={{ "--sport-gradient": sport.gradient } as React.CSSProperties}
              >
                <div className="home-sport-card__icon">{sport.icon}</div>
                <h3 className="home-sport-card__name">{sport.name}</h3>
                <p className="home-sport-card__desc">{sport.description}</p>
                <span className="home-sport-card__arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED TURFS ===== */}
      {featuredTurfs.length > 0 && (
        <section className="home-section home-section--alt">
          <div className="home-section__container">
            <div className="home-section__header">
              <h2 className="home-section__title">Featured Turfs</h2>
              <p className="home-section__subtitle">
                Top-rated venues our users love
              </p>
            </div>

            <div className="home-featured-grid">
              {featuredTurfs.map((turf) => (
                <Link
                  key={turf.id}
                  to={`/turfs/${turf.id}`}
                  className="home-featured-card"
                >
                  <div className="home-featured-card__image-wrapper">
                    <img
                      src={turf.imageUrl}
                      alt={turf.name}
                      className="home-featured-card__image"
                      loading="lazy"
                    />
                    <div className="home-featured-card__overlay">
                      <span className="home-featured-card__cta">Book Now</span>
                    </div>
                  </div>
                  <div className="home-featured-card__content">
                    <h3 className="home-featured-card__name">{turf.name}</h3>
                    <p className="home-featured-card__location">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {turf.location}
                    </p>
                    <div className="home-featured-card__footer">
                      <span className="home-featured-card__price">
                        ₹{turf.pricePerHour}
                        <small>/hr</small>
                      </span>
                      <span className="home-featured-card__rating">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b">
                          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                        </svg>
                        {turf.rating?.toFixed(1) || "0.0"}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="home-section__cta">
              <Link to="/turfs" className="btn btn--primary btn--lg">
                View All Turfs
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ===== HOW IT WORKS ===== */}
      <section className="home-section">
        <div className="home-section__container">
          <div className="home-section__header">
            <h2 className="home-section__title">How It Works</h2>
            <p className="home-section__subtitle">
              Booking a turf is as easy as 1-2-3
            </p>
          </div>

          <div className="home-steps">
            <div className="home-step">
              <div className="home-step__number">1</div>
              <div className="home-step__icon">🔍</div>
              <h3 className="home-step__title">Search</h3>
              <p className="home-step__desc">
                Browse through our extensive list of turfs, filter by sport,
                location, and price.
              </p>
            </div>

            <div className="home-step__connector">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--border)" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>

            <div className="home-step">
              <div className="home-step__number">2</div>
              <div className="home-step__icon">📋</div>
              <h3 className="home-step__title">Compare</h3>
              <p className="home-step__desc">
                View detailed information, ratings, amenities, and prices to
                find your ideal venue.
              </p>
            </div>

            <div className="home-step__connector">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--border)" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>

            <div className="home-step">
              <div className="home-step__number">3</div>
              <div className="home-step__icon">📞</div>
              <h3 className="home-step__title">Connect</h3>
              <p className="home-step__desc">
                Get the contact details and book directly with the turf owner.
                It's that simple!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="home-section home-section--alt">
        <div className="home-section__container">
          <div className="home-section__header">
            <h2 className="home-section__title">Why Choose BookTheTurf?</h2>
            <p className="home-section__subtitle">
              We make sports venue booking effortless
            </p>
          </div>

          <div className="home-features">
            <div className="home-feature">
              <div className="home-feature__icon home-feature__icon--green">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3 className="home-feature__title">Verified Listings</h3>
              <p className="home-feature__desc">
                All turfs are verified for quality, ensuring you get the best
                playing experience every time.
              </p>
            </div>

            <div className="home-feature">
              <div className="home-feature__icon home-feature__icon--blue">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48 0a6 6 0 0 1 0-8.49m5.65-2.83L12 12l-1.41-1.41" />
                </svg>
              </div>
              <h3 className="home-feature__title">Easy Discovery</h3>
              <p className="home-feature__desc">
                Powerful search and filters help you find the perfect turf by
                sport, location, and price range.
              </p>
            </div>

            <div className="home-feature">
              <div className="home-feature__icon home-feature__icon--purple">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <h3 className="home-feature__title">Direct Contact</h3>
              <p className="home-feature__desc">
                Connect directly with turf owners. No middlemen, no hidden
                fees — just pure sport.
              </p>
            </div>

            <div className="home-feature">
              <div className="home-feature__icon home-feature__icon--orange">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
                </svg>
              </div>
              <h3 className="home-feature__title">Ratings & Reviews</h3>
              <p className="home-feature__desc">
                Make informed decisions with honest ratings and reviews from
                fellow sports enthusiasts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PARTNER CTA ===== */}
      <section className="home-partner-cta">
        <div className="home-partner-cta__container">
          <div className="home-partner-cta__content">
            <h2 className="home-partner-cta__title">
              Own a Turf? List It Here!
            </h2>
            <p className="home-partner-cta__desc">
              Reach thousands of players looking for their next game. List your
              turf on BookTheTurf and grow your business.
            </p>
            <Link to="/admin/turfs/new" className="btn btn--white btn--lg">
              List Your Turf
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
          <div className="home-partner-cta__visual">
            <span className="home-partner-cta__emoji">🏟️</span>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ACTION ===== */}
      <section className="home-app-cta">
        <p className="home-app-cta__text">
          Ready to play?{" "}
          <Link to="/turfs" className="home-app-cta__link">
            Browse all turfs now
          </Link>
        </p>
      </section>
    </Layout>
  );
}

export default HomePage;