import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Layout from "../components/Layout";
import TurfForm from "../components/TurfForm";
import { getTurfById, updateTurf } from "../api/turfService";
import type { Turf } from "../types/Turf";

function EditTurfPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [turf, setTurf] = useState<Turf | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            getTurfById(Number(id))
                .then(setTurf)
                .catch(console.error)
                .finally(() => setLoading(false));
        }
    }, [id]);

    const handleSubmit = async (updatedTurf: Turf) => {
        await updateTurf(Number(id), updatedTurf);
        navigate("/admin/turfs");
    };

    if (loading) {
        return (
            <Layout>
                <div className="admin-page">
                    <div className="admin-loading">Loading turf details...</div>
                </div>
            </Layout>
        );
    }

    if (!turf) {
        return (
            <Layout>
                <div className="admin-page">
                    <div className="admin-empty">
                        <h3>Turf not found</h3>
                        <p>The turf you're looking for doesn't exist.</p>
                        <Link to="/admin/turfs" className="btn btn--primary">
                            Back to Turfs
                        </Link>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="admin-page">
                <div className="admin-page__header">
                    <div>
                        <div className="admin-breadcrumb">
                            <Link to="/admin/turfs">Turfs</Link>
                            <span>/</span>
                            <span>Edit</span>
                            <span>/</span>
                            <span>{turf.name}</span>
                        </div>
                        <h1 className="admin-page__title">Edit Turf</h1>
                        <p className="admin-page__subtitle">
                            Update the details for {turf.name}
                        </p>
                    </div>
                </div>

                <div className="admin-form-card">
                    <TurfForm
                        initialData={turf}
                        onSubmit={handleSubmit}
                    />
                </div>
            </div>
        </Layout>
    );
}

export default EditTurfPage;