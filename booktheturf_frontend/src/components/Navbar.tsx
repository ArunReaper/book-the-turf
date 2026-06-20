import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/turfs", label: "Turfs" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar__container">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-icon">🏟️</span>
          <span className="navbar__logo-text">
            Book<span className="navbar__logo-accent">The</span>Turf
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="navbar__links">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`navbar__link ${isActive(link.to) ? "navbar__link--active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <Link to="/admin/turfs" className="navbar__cta">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Admin
        </Link>

        {/* Mobile Hamburger */}
        <button
          className="navbar__hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`navbar__hamburger-line ${menuOpen ? "navbar__hamburger-line--open" : ""}`} />
          <span className={`navbar__hamburger-line ${menuOpen ? "navbar__hamburger-line--open" : ""}`} />
          <span className={`navbar__hamburger-line ${menuOpen ? "navbar__hamburger-line--open" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile ${menuOpen ? "navbar__mobile--open" : ""}`}>
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`navbar__mobile-link ${isActive(link.to) ? "navbar__mobile-link--active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <Link
          to="/admin/turfs"
          className="navbar__mobile-cta"
          onClick={() => setMenuOpen(false)}
        >
          Admin Panel
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;