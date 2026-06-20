import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getTurfById } from "../api/turfService";
import type { Turf } from "../types/Turf";
import Layout from "../components/Layout";
import LeadForm from "../components/LeadForm";

/** Parse sportsType which may be a ~-delimited string */
function parseSports(turf: Turf): string[] {
  if (turf.sportsTypes?.length) return turf.sportsTypes;
  if (turf.sportsType) {
    if (turf.sportsType.includes("~")) {
      return turf.sportsType.split("~").map((s) => s.trim()).filter(Boolean);
    }
    return [turf.sportsType];
  }
  return [];
}

const sportIconMap: Record<string, string> = {
  Football: "⚽",
  Cricket: "🏏",
  "Box Cricket": "🏏",
  Badminton: "🏸",
  Tennis: "🎾",
  Basketball: "🏀",
  Volleyball: "🏐",
  Swimming: "🏊",
  "Table Tennis": "🏓",
};

const amenityIcons: Record<string, string> = {
  Parking: "🅿️",
  "Parking space": "🅿️",
  Restroom: "🚻",
  Washroom: "🚻",
  "Separate Washroom": "🚻",
  Refreshments: "☕",
  "Drinking Water": "💧",
  "Sports equipment": "🏏",
  "Flood Lights": "💡",
  "Seating Area": "🪑",
  "Changing Room": "👔",
  "Two & Four Wheeler Parking": "🅿️",
  "Sitting Area": "🪑",
};

function TurfDetailsPage() {
  const { id } = useParams();
  const [turf, setTurf] = useState<Turf | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getTurfById(Number(id))
        .then((data: Turf) => {
          setTurf(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="turf-details-loading">
          <div className="turf-details-loading__inner">
            <div className="skeleton-image" style={{ height: "400px", borderRadius: "16px" }} />
            <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
              <div className="skeleton-line" style={{ width: "60%", height: "28px" }} />
              <div className="skeleton-line" style={{ width: "40%", height: "18px" }} />
              <div className="skeleton-line" style={{ width: "80%", height: "14px" }} />
              <div className="skeleton-line" style={{ width: "50%", height: "14px" }} />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!turf) {
    return (
      <Layout>
        <div className="turf-details-not-found">
          <span style={{ fontSize: "48px" }}>🏟️</span>
          <h2>Turf not found</h2>
          <p>The turf you're looking for doesn't exist or has been removed.</p>
          <Link to="/turfs" className="btn btn--primary">
            Browse Turfs
          </Link>
        </div>
      </Layout>
    );
  }

  const sports = parseSports(turf);
  const allImages = turf.images?.length ? turf.images : turf.imageUrl ? [turf.imageUrl] : [];
  const amenities = turf.amenities || [];

  return (
    <Layout>
      <div className="turf-details">
        {/* Breadcrumb */}
        <nav className="turf-details__breadcrumb">
          <Link to="/">Home</Link>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <Link to="/turfs">Turfs</Link>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <span>{turf.name}</span>
        </nav>

        <div className="turf-details__layout">
          {/* LEFT COLUMN - Images & Info */}
          <div className="turf-details__main">
            {/* Image Gallery */}
            <div className="turf-details__gallery">
              <div className="turf-details__main-image">
                <img
                  src={allImages[activeImage]}
                  alt={turf.name}
                />
                <span className="turf-details__badge">Featured</span>
              </div>
              {allImages.length > 1 && (
                <div className="turf-details__thumbnails">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      className={`turf-details__thumb ${idx === activeImage ? "turf-details__thumb--active" : ""}`}
                      onClick={() => setActiveImage(idx)}
                    >
                      <img src={img} alt={`${turf.name} ${idx + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Turf Name & Rating */}
            <div className="turf-details__header-card">
              <div className="turf-details__header-top">
                <div>
                  <h1 className="turf-details__name">{turf.name}</h1>
                  <div className="turf-details__meta">
                    <span className="turf-details__location">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {turf.area || turf.location}
                    </span>
                  </div>
                </div>
                <div className="turf-details__rating-box">
                  <div className="turf-details__rating">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1">
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                    </svg>
                    <span className="turf-details__rating-value">{turf.rating?.toFixed(1) || "0.0"}</span>
                  </div>
                  {turf.ratingCount !== undefined && (
                    <span className="turf-details__rating-count">{turf.ratingCount} ratings</span>
                  )}
                </div>
              </div>

              {/* Sports */}
              {sports.length > 0 && (
                <div className="turf-details__sports-row">
                  {sports.map((sport) => (
                    <span key={sport} className="turf-details__sport-badge">
                      <span className="turf-details__sport-icon">{sportIconMap[sport] || "⚽"}</span>
                      {sport}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            {turf.description && (
              <div className="turf-details__card">
                <h2 className="turf-details__card-title">About this venue</h2>
                <p className="turf-details__desc">{turf.description}</p>
              </div>
            )}

            {/* Amenities */}
            {amenities.length > 0 && (
              <div className="turf-details__card">
                <h2 className="turf-details__card-title">Amenities & Facilities</h2>
                <div className="turf-details__amenities-grid">
                  {amenities.map((amenity) => (
                    <div key={amenity} className="turf-details__amenity">
                      <span className="turf-details__amenity-icon">
                        {amenityIcons[amenity] || "✓"}
                      </span>
                      <span className="turf-details__amenity-name">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Info */}
            <div className="turf-details__card">
              <h2 className="turf-details__card-title">Contact Information</h2>
              <div className="turf-details__contact-list">
                <div className="turf-details__contact-item">
                  <div className="turf-details__contact-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <span className="turf-details__contact-label">Phone</span>
                    <a href={`tel:${turf.contactNumber}`} className="turf-details__contact-value">
                      {turf.contactNumber}
                    </a>
                  </div>
                </div>
                <div className="turf-details__contact-item">
                  <div className="turf-details__contact-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <span className="turf-details__contact-label">Address</span>
                    <p className="turf-details__contact-value">{turf.address || turf.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Sidebar */}
          <div className="turf-details__sidebar">
            {/* Price Card */}
            <div className="turf-details__sidebar-card">
              <div className="turf-details__price-section">
                <span className="turf-details__price-label">Starting from</span>
                <span className="turf-details__price-value">
                  ₹{turf.pricePerHour}
                  <small>/hr</small>
                </span>
              </div>

              {turf.isBookable !== false && (
                <div className="turf-details__availability">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <span>Available for booking</span>
                </div>
              )}

              <a href={`tel:${turf.contactNumber}`} className="turf-details__call-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Call {turf.contactNumber}
              </a>
            </div>

            {/* Lead Form Card */}
            <div className="turf-details__sidebar-card">
              <h3 className="turf-details__sidebar-title">Interested in this turf?</h3>
              <p className="turf-details__sidebar-subtitle">
                Leave your details and we'll get back to you
              </p>
              <LeadForm />
            </div>

            {/* Quick Info */}
            <div className="turf-details__sidebar-card">
              <h3 className="turf-details__sidebar-title">Quick Info</h3>
              <div className="turf-details__quick-info">
                <div className="turf-details__quick-item">
                  <span className="turf-details__quick-label">Sport{sports.length > 1 ? "s" : ""}</span>
                  <span className="turf-details__quick-value">{sports.join(", ") || "—"}</span>
                </div>
                <div className="turf-details__quick-item">
                  <span className="turf-details__quick-label">Price</span>
                  <span className="turf-details__quick-value">₹{turf.pricePerHour}/hr</span>
                </div>
                <div className="turf-details__quick-item">
                  <span className="turf-details__quick-label">Rating</span>
                  <span className="turf-details__quick-value">{turf.rating?.toFixed(1) || "—"} / 5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default TurfDetailsPage;