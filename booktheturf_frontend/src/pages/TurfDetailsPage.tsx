import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTurfById } from "../api/turfService";
import type { Turf } from "../types/Turf";

function TurfDetailsPage() {

    const { id } = useParams();

    const [turf, setTurf] = useState<Turf | null>(null);

    useEffect(() => {

        if (id) {
            getTurfById(Number(id))
                .then(data => setTurf(data))
                .catch(console.error);
        }

    }, [id]);

    if (!turf) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>{turf.name}</h1>

            <p>{turf.location}</p>

            <p>₹ {turf.pricePerHour}</p>

            <p>{turf.description}</p>

            <p>{turf.contactNumber}</p>
        </div>
    );
}

export default TurfDetailsPage;