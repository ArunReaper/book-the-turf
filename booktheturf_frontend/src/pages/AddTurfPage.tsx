import { useNavigate, Link } from "react-router-dom";
import Layout from "../components/Layout";
import TurfForm from "../components/TurfForm";
import { createTurf } from "../api/turfService";
import type { Turf } from "../types/Turf";

function AddTurfPage() {
    const navigate = useNavigate();

    const handleSubmit = async (turf: Turf) => {
        await createTurf(turf);
        navigate("/admin/turfs");
    };

    return (
        <Layout>
            <div className="admin-page">
                <div className="admin-page__header">
                    <div>
                        <div className="admin-breadcrumb">
                            <Link to="/admin/turfs">Turfs</Link>
                            <span>/</span>
                            <span>Add New</span>
                        </div>
                        <h1 className="admin-page__title">Add New Turf</h1>
                        <p className="admin-page__subtitle">
                            Fill in the details below to add a new turf
                        </p>
                    </div>
                </div>

                <div className="admin-form-card">
                    <TurfForm onSubmit={handleSubmit} />
                </div>
            </div>
        </Layout>
    );
}

export default AddTurfPage;