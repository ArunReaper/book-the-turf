import { useEffect, useState } from "react";
import type { Turf } from "../types/Turf";

interface TurfFormProps {
    initialData?: Turf;
    onSubmit: (turf: Turf) => void;
}

function TurfForm({
    initialData,
    onSubmit,
}: TurfFormProps) {

    const [turf, setTurf] = useState<Turf>({
        name: "",
        location: "",
        pricePerHour: 0,
        description: "",
        contactNumber: "",
        imageUrl: "",
        sportsType: "",
        rating: 0,
    });

    useEffect(() => {

        if (initialData) {
            setTurf(initialData);
        }

    }, [initialData]);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {

        setTurf({
            ...turf,
            [e.target.name]:
                e.target.name === "pricePerHour" ||
                e.target.name === "rating"
                    ? Number(e.target.value)
                    : e.target.value,
        });

    };

    const handleSubmit = (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        onSubmit(turf);

    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                maxWidth: "600px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
            }}
        >
            <input
                name="name"
                placeholder="Turf Name"
                value={turf.name}
                onChange={handleChange}
                required
            />

            <input
                name="location"
                placeholder="Location"
                value={turf.location}
                onChange={handleChange}
                required
            />

            <input
                name="pricePerHour"
                type="number"
                placeholder="Price Per Hour"
                value={turf.pricePerHour}
                onChange={handleChange}
                required
            />

            <input
                name="contactNumber"
                placeholder="Contact Number"
                value={turf.contactNumber}
                onChange={handleChange}
            />

            <input
                name="imageUrl"
                placeholder="Image URL"
                value={turf.imageUrl}
                onChange={handleChange}
            />

            <select
                name="sportsType"
                value={turf.sportsType}
                onChange={handleChange}
            >
                <option value="">
                    Select Sport
                </option>

                <option value="Football">
                    Football
                </option>

                <option value="Cricket">
                    Cricket
                </option>

                <option value="Box Cricket">
                    Box Cricket
                </option>

                <option value="Badminton">
                    Badminton
                </option>

                <option value="Multi Sports">
                    Multi Sports
                </option>
            </select>

            <input
                name="rating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                placeholder="Rating"
                value={turf.rating}
                onChange={handleChange}
            />

            <textarea
                name="description"
                placeholder="Description"
                rows={5}
                value={turf.description}
                onChange={handleChange}
            />

            {turf.imageUrl && (
                <img
                    src={turf.imageUrl}
                    alt="Preview"
                    style={{
                        width: "250px",
                        borderRadius: "8px",
                    }}
                />
            )}

            <button type="submit">
                Save Turf
            </button>
        </form>
    );
}

export default TurfForm;