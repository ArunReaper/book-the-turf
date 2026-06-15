import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

import {
    getAllTurfs,
    deleteTurf
} from "../api/turfService";
import type { Turf } from "../types/Turf";

function AdminTurfsPage() {

    const [turfs, setTurfs] = useState<Turf[]>([]);

    useEffect(() => {

        loadTurfs();

    }, []);

    const loadTurfs = async () => {

        try {

            const data = await getAllTurfs();
            setTurfs(data);

        } catch (error) {

            console.error(error);

        }

    };

    const handleDelete = async (
        id: number
    ) => {

        const confirmed =
            window.confirm(
                "Delete this turf?"
            );

        if (!confirmed) {
            return;
        }

        try {

            await deleteTurf(id);

            setTurfs(
                turfs.filter(
                    turf => turf.id !== id
                )
            );

        } catch (error) {

            console.error(error);

        }
    };

    return (
        <Layout>

            <h1>Admin Turf Management</h1>

            <Link to="/admin/turfs/new">
                <button>
                    Add Turf
                </button>
            </Link>

            <table
                style={{
                    width: "100%",
                    marginTop: "20px",
                }}
            >

                <thead>

                <tr>

                    <th>ID</th>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Price</th>
                    <th>Actions</th>

                </tr>

                </thead>

                <tbody>

                {turfs.map(turf => (

                    <tr key={turf.id}>

                        <td>{turf.id}</td>

                        <td>{turf.name}</td>

                        <td>{turf.location}</td>

                        <td>
                            ₹{turf.pricePerHour}
                        </td>

                        <td>

                            <Link to={`/admin/turfs/edit/${turf.id}`}>
                                <button>
                                    Edit
                                </button>
                            </Link>

                            <button
                                onClick={() =>
                                    handleDelete(
                                        turf.id!
                                    )
                                }
                            >
                                Delete
                            </button>

                        </td>

                    </tr>

                ))}

                </tbody>

            </table>

        </Layout>
    );
}

export default AdminTurfsPage;