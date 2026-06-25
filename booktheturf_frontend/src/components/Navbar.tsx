import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuth, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;
  const isAdminPath = location.pathname.startsWith("/admin");

  // Hide navbar on login page to keep it clean
  if (location.pathname === "/admin/login") {
    return null;
  }

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/turfs", label: "Turfs" },
    { to: "/contact", label: "Contact" },
  ];

  const adminDashboardLink = isAuth ? "/admin/turfs" : "/admin/login";

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
          {/* Admin link in nav when on admin pages */}
          {isAdminPath && isAuth && (
            <>
              <Link
                to="/admin/turfs"
                className={`navbar__link ${isActive("/admin/turfs") ? "navbar__link--active" : ""}`}
              >
                Turfs
              </Link>
              <Link
                to="/admin/leads"
                className={`navbar__link ${isActive("/admin/leads") ? "navbar__link--active" : ""}`}
              >
                Leads
              </Link>
            </>
          )}
        </div>

        {/* Desktop CTA */}
        {isAuth ? (
          <div className="navbar__admin-group">
            <Link to={adminDashboardLink} className="navbar__cta">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              Dashboard
            </Link>
            <button onClick={logout} className="navbar__logout-btn" title="Logout">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </div>
        ) : (
          <Link to="/admin/login" className="navbar__cta">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Admin
          </Link>
        )}

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
        {isAuth && (
          <>
            <Link
              to="/admin/turfs"
              className="navbar__mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              Admin - Turfs
            </Link>
            <Link
              to="/admin/leads"
              className="navbar__mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              Admin - Leads
            </Link>
            <button
              className="navbar__mobile-cta navbar__mobile-cta--logout"
              onClick={() => { logout(); setMenuOpen(false); }}
            >
              Logout
            </button>
          </>
        )}
        {!isAuth && (
          <Link
            to="/admin/login"
            className="navbar__mobile-cta"
            onClick={() => setMenuOpen(false)}
          >
            Admin Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
