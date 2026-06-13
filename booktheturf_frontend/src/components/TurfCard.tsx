import { Link } from "react-router-dom";
import type { Turf } from "../types/Turf";

interface TurfCardProps {
    turf: Turf;
}

function TurfCard({ turf }: TurfCardProps) {
    return (
        <div
            style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "16px",
                width: "300px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
        >
            <img
                src="https://images.unsplash.com/photo-1574629810360-7efbbe195018"
                alt={turf.name}
                style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "8px",
                }}
            />

            <h3>{turf.name}</h3>

            <p>{turf.location}</p>

            <p>
                <strong>₹{turf.pricePerHour}/hr</strong>
            </p>

            <Link to={`/turfs/${turf.id}`}>
                View Details
            </Link>
        </div>
    );
}

export default TurfCard;