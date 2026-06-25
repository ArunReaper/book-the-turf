import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getAllLeads, updateLeadStatus } from "../api/leadService";
import type { Lead } from "../types/Lead";

const STATUS_OPTIONS = ["NEW", "CONTACTED", "INTERESTED", "BOOKED", "REJECTED"];

const STATUS_COLORS: Record<string, string> = {
    NEW: "#3b82f6",
    CONTACTED: "#f59e0b",
    INTERESTED: "#8b5cf6",
    BOOKED: "#22c55e",
    REJECTED: "#ef4444",
};

function AdminLeadsPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState<number | null>(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadLeads();
    }, []);

    const loadLeads = async () => {
        try {
            setLoading(true);
            const data = await getAllLeads();
            setLeads(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (leadId: number, status: string) => {
        setUpdatingId(leadId);
        try {
            await updateLeadStatus(leadId, status);
            setLeads(leads.map(lead =>
                lead.id === leadId ? { ...lead, status } : lead
            ));
        } catch (error) {
            console.error(error);
            alert("Failed to update status");
        } finally {
            setUpdatingId(null);
        }
    };

    const filteredLeads = leads.filter(lead => {
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        return (
            lead.name.toLowerCase().includes(q) ||
            lead.email.toLowerCase().includes(q) ||
            lead.phone.toLowerCase().includes(q) ||
            lead.message?.toLowerCase().includes(q)
        );
    });

    const statusCounts = STATUS_OPTIONS.reduce((acc, s) => {
        acc[s] = leads.filter(l => l.status === s).length;
        return acc;
    }, {} as Record<string, number>);

    return (
        <Layout>
            <div className="admin-page">
                {/* Header */}
                <div className="admin-page__header">
                    <div>
                        <h1 className="admin-page__title">Lead Management</h1>
                        <p className="admin-page__subtitle">
                            Track and manage customer enquiries
                        </p>
                    </div>
                    <div className="admin-page__search">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search leads..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="admin-page__search-input"
                        />
                    </div>
                </div>

                {/* Status Stats */}
                <div className="admin-stats">
                    {STATUS_OPTIONS.map(status => (
                        <div key={status} className="admin-stat-card">
                            <div
                                className="admin-stat-card__icon"
                                style={{ background: `${STATUS_COLORS[status]}15`, color: STATUS_COLORS[status] }}
                            >
                                <span style={{ fontSize: 18, fontWeight: 700 }}>
                                    {statusCounts[status] || 0}
                                </span>
                            </div>
                            <div className="admin-stat-card__info">
                                <span className="admin-stat-card__value">{statusCounts[status] || 0}</span>
                                <span className="admin-stat-card__label">{status}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Leads Table */}
                <div className="admin-table-wrapper">
                    {loading ? (
                        <div className="admin-loading">Loading leads...</div>
                    ) : filteredLeads.length === 0 ? (
                        <div className="admin-empty">
                            <div className="admin-empty__icon">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            </div>
                            <h3>{search ? "No leads match your search" : "No leads yet"}</h3>
                            <p>{search ? "Try a different search term" : "Leads will appear here when customers submit the contact form"}</p>
                        </div>
                    ) : (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Contact</th>
                                    <th>Message</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLeads.map(lead => (
                                    <tr key={lead.id}>
                                        <td>
                                            <div className="admin-table__cell-title">
                                                <div className="admin-table__avatar">
                                                    {lead.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <span className="admin-table__name">{lead.name}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="admin-table__contact">
                                                <a href={`mailto:${lead.email}`} className="admin-table__contact-link">
                                                    {lead.email}
                                                </a>
                                                <a href={`tel:${lead.phone}`} className="admin-table__contact-link">
                                                    {lead.phone}
                                                </a>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="admin-table__message">
                                                {lead.message || "—"}
                                            </div>
                                        </td>
                                        <td>
                                            <span
                                                className="admin-table__status"
                                                style={{
                                                    background: `${STATUS_COLORS[lead.status]}15`,
                                                    color: STATUS_COLORS[lead.status],
                                                    borderColor: `${STATUS_COLORS[lead.status]}30`,
                                                }}
                                            >
                                                {lead.status}
                                            </span>
                                        </td>
                                        <td>
                                            <select
                                                className="admin-table__status-select"
                                                value={lead.status}
                                                onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                                                disabled={updatingId === lead.id}
                                                style={{
                                                    borderColor: `${STATUS_COLORS[lead.status]}50`,
                                                }}
                                            >
                                                {STATUS_OPTIONS.map(s => (
                                                    <option key={s} value={s}>{s}</option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default AdminLeadsPage;