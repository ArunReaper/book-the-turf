import { useEffect, useState } from "react";
import { getAllTurfs } from "../api/turfService";
import type { Turf } from "../types/Turf";
import { Link } from "react-router-dom";

function TurfListPage() {
    const [turfs, setTurfs] = useState<Turf[]>([]);

    useEffect(() => {
        getAllTurfs()
            .then((data) => {
                setTurfs(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <h1>Available Turfs</h1>

            {turfs.map((turf) => (
                <div
                    key={turf.id}
                    style={{
                        border: "1px solid #ccc",
                        padding: "16px",
                        marginBottom: "16px",
                        borderRadius: "8px",
                    }}
                >
                    <h3>{turf.name}</h3>

                    <p>
                        <strong>Location:</strong> {turf.location}
                    </p>

                    <p>
                        <strong>Price:</strong> ₹{turf.pricePerHour}/hr
                    </p>

                    <Link to={`/turfs/${turf.id}`}>
                        View Details
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default TurfListPage;