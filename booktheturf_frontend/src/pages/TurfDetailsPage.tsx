import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTurfById } from "../api/turfService";
import type { Turf } from "../types/Turf";
import Layout from "../components/Layout";
import LeadForm from "../components/LeadForm";

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
        <Layout>
            <div
                style={{
                    maxWidth: "800px",
                    margin: "0 auto",
                }}
            >
                <img
                    src={turf.imageUrl}
                    alt={turf.name}
                    style={{
                        width: "100%",
                        borderRadius: "12px",
                        marginBottom: "20px",
                        maxHeight: "400px",
                        objectFit: "cover",
                    }}
                />

                <h1>{turf.name}</h1>

                <p>
                    <strong>Location:</strong> {turf.location}
                </p>

                <p>
                    <strong>Price:</strong> ₹{turf.pricePerHour}/hr
                </p>

                <p>
                    <strong>Description:</strong> {turf.description}
                </p>

                <p>
                    <strong>Contact:</strong> {turf.contactNumber}
                </p>

                <LeadForm />
            </div>
        </Layout>
    );
}

export default TurfDetailsPage;