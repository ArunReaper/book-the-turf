import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import TurfForm from "../components/TurfForm";
import { getTurfById, updateTurf } from "../api/turfService";
import type { Turf } from "../types/Turf";

function EditTurfPage() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [turf, setTurf] = useState<Turf | null>(null);

    useEffect(() => {

        if (id) {

            getTurfById(Number(id))
                .then(setTurf)
                .catch(console.error);

        }

    }, [id]);

    const handleSubmit = async (
        updatedTurf: Turf
    ) => {

        await updateTurf(
            Number(id),
            updatedTurf
        );

        navigate("/admin/turfs");

    };

    if (!turf) {

        return <p>Loading...</p>;

    }

    return (
        <Layout>

            <h1>Edit Turf</h1>

            <TurfForm
                initialData={turf}
                onSubmit={handleSubmit}
            />

        </Layout>
    );
}

export default EditTurfPage;