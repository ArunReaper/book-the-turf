import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getAllLeads, updateLeadStatus } from "../api/leadService";
import type { Lead } from "../types/Lead";

function AdminLeadsPage() {

    const [leads, setLeads] = useState<Lead[]>([]);

    useEffect(() => {

        loadLeads();

    }, []);

    const loadLeads = async () => {

        try {

            const data = await getAllLeads();
            setLeads(data);

        } catch (error) {

            console.error(error);

        }

    };

    const handleStatusChange = async (
        leadId: number,
        status: string
    ) => {

        try {

            await updateLeadStatus(
                leadId,
                status
            );

            setLeads(
                leads.map((lead) =>
                    lead.id === leadId
                        ? { ...lead, status }
                        : lead
                )
            );

        } catch (error) {

            console.error(error);

            alert("Failed to update status");
        }
    };

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
                    marginTop: "20px",
                }}
            >

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Name</th>

                        <th>Email</th>

                        <th>Phone</th>

                        <th>Message</th>

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

                            <td>{lead.message}</td>

                            <td>

                                <select
                                    value={lead.status}
                                    onChange={(e) =>
                                        handleStatusChange(
                                            lead.id,
                                            e.target.value
                                        )
                                    }
                                >

                                    <option value="NEW">
                                        NEW
                                    </option>

                                    <option value="CONTACTED">
                                        CONTACTED
                                    </option>

                                    <option value="INTERESTED">
                                        INTERESTED
                                    </option>

                                    <option value="BOOKED">
                                        BOOKED
                                    </option>

                                    <option value="REJECTED">
                                        REJECTED
                                    </option>

                                </select>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </Layout>
    );
}

export default AdminLeadsPage;