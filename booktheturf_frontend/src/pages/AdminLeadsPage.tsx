import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getAllLeads } from "../api/leadService";
import type { Lead } from "../types/Lead";

function AdminLeadsPage() {

    const [leads, setLeads] = useState<Lead[]>([]);

    useEffect(() => {

        getAllLeads()
            .then((data) => {
                setLeads(data);
            })
            .catch(console.error);

    }, []);

    return (
        <Layout>

            <h1>Lead Dashboard</h1>
            <h2>
                Total Leads: {leads.length}
            </h2>
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                }}
            >

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Status</th>
                    </tr>

                </thead>

                <tbody>

                    {leads.map((lead) => (

                        <tr key={lead.id}>

                            <td>{lead.id}</td>

                            <td>{lead.name}</td>

                            <td>{lead.email}</td>

                            <td>{lead.phone}</td>

                            <td>
                                <span
                                    style={{
                                        color:
                                            lead.status === "NEW"
                                                ? "green"
                                                : "black",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {lead.status}
                                </span>
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </Layout>
    );
}

export default AdminLeadsPage;