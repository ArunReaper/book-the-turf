import { useEffect, useState } from "react";
import type { Turf } from "../types/Turf";

interface TurfFormProps {
    initialData?: Turf;
    onSubmit: (turf: Turf) => void;
}

const SPORTS_OPTIONS = [
    "Football",
    "Cricket",
    "Box Cricket",
    "Badminton",
    "Tennis",
    "Basketball",
    "Volleyball",
    "Swimming",
    "Table Tennis",
    "Multi Sports",
];

function TurfForm({ initialData, onSubmit }: TurfFormProps) {
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
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (initialData) {
            setTurf(initialData);
        }
    }, [initialData]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const value =
            e.target.name === "pricePerHour" || e.target.name === "rating"
                ? Number(e.target.value)
                : e.target.value;
        setTurf({ ...turf, [e.target.name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await onSubmit(turf);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="turf-form">
            <div className="turf-form__grid">
                <div className="turf-form__field">
                    <label className="turf-form__label">Turf Name *</label>
                    <input
                        name="name"
                        className="turf-form__input"
                        placeholder="e.g. Green Field Stadium"
                        value={turf.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="turf-form__field">
                    <label className="turf-form__label">Location *</label>
                    <input
                        name="location"
                        className="turf-form__input"
                        placeholder="e.g. HSR Layout, Bangalore"
                        value={turf.location}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="turf-form__field">
                    <label className="turf-form__label">Price Per Hour (₹) *</label>
                    <input
                        name="pricePerHour"
                        type="number"
                        className="turf-form__input"
                        placeholder="e.g. 500"
                        min="0"
                        value={turf.pricePerHour}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="turf-form__field">
                    <label className="turf-form__label">Contact Number</label>
                    <input
                        name="contactNumber"
                        className="turf-form__input"
                        placeholder="e.g. +91 9876543210"
                        value={turf.contactNumber}
                        onChange={handleChange}
                    />
                </div>

                <div className="turf-form__field">
                    <label className="turf-form__label">Sports Type</label>
                    <select
                        name="sportsType"
                        className="turf-form__input turf-form__select"
                        value={turf.sportsType}
                        onChange={handleChange}
                    >
                        <option value="">Select a sport</option>
                        {SPORTS_OPTIONS.map(sport => (
                            <option key={sport} value={sport}>{sport}</option>
                        ))}
                    </select>
                </div>

                <div className="turf-form__field">
                    <label className="turf-form__label">Rating (0–5)</label>
                    <input
                        name="rating"
                        type="number"
                        className="turf-form__input"
                        min="0"
                        max="5"
                        step="0.1"
                        placeholder="e.g. 4.5"
                        value={turf.rating}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="turf-form__field">
                <label className="turf-form__label">Image URL</label>
                <input
                    name="imageUrl"
                    className="turf-form__input"
                    placeholder="https://example.com/image.jpg"
                    value={turf.imageUrl}
                    onChange={handleChange}
                />
                {turf.imageUrl && (
                    <div className="turf-form__preview">
                        <img src={turf.imageUrl} alt="Preview" />
                    </div>
                )}
            </div>

            <div className="turf-form__field">
                <label className="turf-form__label">Description</label>
                <textarea
                    name="description"
                    className="turf-form__textarea"
                    placeholder="Describe the turf facilities, amenities, etc."
                    rows={5}
                    value={turf.description}
                    onChange={handleChange}
                />
            </div>

            <div className="turf-form__actions">
                <button
                    type="submit"
                    className="btn btn--primary btn--lg"
                    disabled={submitting}
                >
                    {submitting
                        ? "Saving..."
                        : initialData
                            ? "Update Turf"
                            : "Create Turf"
                    }
                </button>
            </div>
        </form>
    );
}

export default TurfForm;