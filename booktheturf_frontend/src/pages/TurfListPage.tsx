import { useEffect, useState } from "react";
import { getAllTurfs } from "../api/turfService";
import TurfCard from "../components/TurfCard";
import type { Turf } from "../types/Turf";
import Layout from "../components/Layout";

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
        <Layout>
            <div>
                <h1>Available Turfs</h1>

                <div
                    style={{
                        display: "flex",
                        gap: "20px",
                        flexWrap: "wrap",
                    }}
                >
                    {turfs.map((turf) => (
                        <TurfCard
                            key={turf.id}
                            turf={turf}
                        />
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export default TurfListPage;