import { useEffect, useState } from "react";
import { getAllTurfs } from "../api/turfService";
import type { Turf } from "../types/Turf";

function TurfListPage() {

    const [turfs, setTurfs] = useState<Turf[]>([]);
    

    useEffect(() => {

        getAllTurfs()
            .then(data => {
                setTurfs(data);
            })
            .catch(error => {
                console.error(error);
            });

    }, []);

    return (
        <div>
            <h1>Available Turfs</h1>

            {turfs.map(turf => (
                <div key={turf.id}>
                    <h3>{turf.name}</h3>
                    <p>{turf.location}</p>
                    <p>₹ {turf.pricePerHour}</p>
                </div>
            ))}
        </div>
    );
}

export default TurfListPage;