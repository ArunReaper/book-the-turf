import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import TurfForm from "../components/TurfForm";
import { createTurf } from "../api/turfService";
import type { Turf } from "../types/Turf";

function AddTurfPage() {

    const navigate = useNavigate();

    const handleSubmit = async (
        turf: Turf
    ) => {

        await createTurf(turf);

        navigate("/admin/turfs");

    };

    return (
        <Layout>

            <h1>Add Turf</h1>

            <Link to="/admin/turfs/new">

                <button>

                    Add Turf
 
                </button>

            </Link>
            <TurfForm
                onSubmit={handleSubmit}
            />

        </Layout>
    );
}

export default AddTurfPage;