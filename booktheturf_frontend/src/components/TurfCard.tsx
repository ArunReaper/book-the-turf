import { Link } from "react-router-dom";
import type { Turf } from "../types/Turf";

interface TurfCardProps {
  turf: Turf;
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
  "Pickleball": "🏓",
};

/** Parse sportsType which may be a ~-delimited string (e.g. "Cricket~Tennis~Football") */
function parseSports(turf: Turf): string[] {
  // Priority: sportsTypes[] array > sportsType string
  if (turf.sportsTypes?.length) {
    return turf.sportsTypes;
  }
  if (turf.sportsType) {
    // Check if it's a ~-separated string
    if (turf.sportsType.includes("~")) {
      return turf.sportsType.split("~").map((s) => s.trim()).filter(Boolean);
    }
    return [turf.sportsType];
  }
  return [];
}

function TurfCard({ turf }: TurfCardProps) {
  const displaySports = parseSports(turf);

  const visibleSports = displaySports.slice(0, 2);
  const remainingCount = Math.max(0, displaySports.length - 2);

  return (
    <Link
      to={`/turfs/${turf.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="turf-card">
        {/* Image Section */}
        <div className="turf-card__image-wrapper">
          <img
            src={turf.imageUrl}
            alt={turf.name}
            className="turf-card__image"
            loading="lazy"
          />
          {turf.isBookable !== false && (
            <span className="turf-card__badge">Bookable</span>
          )}
        </div>

        {/* Content Section */}
        <div className="turf-card__content">
          {/* Name & Rating */}
          <div className="turf-card__header">
            <h3 className="turf-card__title">{turf.name}</h3>
            <div className="turf-card__rating">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="#f59e0b"
                stroke="#f59e0b"
                strokeWidth="1"
              >
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
              </svg>
              <span className="turf-card__rating-value">
                {turf.rating?.toFixed(2) || "0.00"}
              </span>
              {turf.ratingCount !== undefined && (
                <span className="turf-card__rating-count">
                  ({turf.ratingCount})
                </span>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="turf-card__location">
            <span className="turf-card__area">
              {turf.area || turf.location}
            </span>
            {turf.distance && (
              <span className="turf-card__distance">(~ {turf.distance})</span>
            )}
          </div>

          {/* Sports Icons */}
          {visibleSports.length > 0 && (
            <div className="turf-card__sports">
              {visibleSports.map((sport) => (
                <span key={sport} className="turf-card__sport-icon" title={sport}>
                  {sportIconMap[sport] || "⚽"}
                </span>
              ))}
              {remainingCount > 0 && (
                <span className="turf-card__more-sports">+ {remainingCount} more</span>
              )}
            </div>
          )}

          {/* Amenities */}
          {turf.amenities && turf.amenities.length > 0 && (
            <div className="turf-card__amenities">
              {turf.amenities.slice(0, 3).map((amenity) => (
                <span key={amenity} className="turf-card__amenity-tag">
                  {amenity}
                </span>
              ))}
            </div>
          )}

          {/* Price */}
          <div className="turf-card__footer">
            <span className="turf-card__price">
              ₹{turf.pricePerHour}/hr
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default TurfCard;