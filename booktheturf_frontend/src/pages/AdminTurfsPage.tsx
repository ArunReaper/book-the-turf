import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { getAllTurfs, deleteTurf } from "../api/turfService";
import type { Turf } from "../types/Turf";

function AdminTurfsPage() {
    const [turfs, setTurfs] = useState<Turf[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        loadTurfs();
    }, []);

    const loadTurfs = async () => {
        try {
            setLoading(true);
            const data = await getAllTurfs();
            setTurfs(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        setDeleting(true);
        try {
            await deleteTurf(id);
            setTurfs(turfs.filter(turf => turf.id !== id));
            setDeleteId(null);
        } catch (error) {
            console.error(error);
            alert("Failed to delete turf");
        } finally {
            setDeleting(false);
        }
    };

    return (
        <Layout>
            <div className="admin-page">
                {/* Header */}
                <div className="admin-page__header">
                    <div>
                        <h1 className="admin-page__title">Turf Management</h1>
                        <p className="admin-page__subtitle">
                            Manage all your turfs in one place
                        </p>
                    </div>
                    <Link to="/admin/turfs/new" className="btn btn--primary">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        Add New Turf
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="admin-stats">
                    <div className="admin-stat-card">
                        <div className="admin-stat-card__icon admin-stat-card__icon--green">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                <polyline points="9 22 9 12 15 12 15 22" />
                            </svg>
                        </div>
                        <div className="admin-stat-card__info">
                            <span className="admin-stat-card__value">{turfs.length}</span>
                            <span className="admin-stat-card__label">Total Turfs</span>
                        </div>
                    </div>
                    <div className="admin-stat-card">
                        <div className="admin-stat-card__icon admin-stat-card__icon--blue">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="2" y1="12" x2="22" y2="12" />
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                            </svg>
                        </div>
                        <div className="admin-stat-card__info">
                            <span className="admin-stat-card__value">
                                {turfs.filter(t => t.sportsType).length}
                            </span>
                            <span className="admin-stat-card__label">Sports Types</span>
                        </div>
                    </div>
                    <div className="admin-stat-card">
                        <div className="admin-stat-card__icon admin-stat-card__icon--orange">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="1" x2="12" y2="23" />
                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                        </div>
                        <div className="admin-stat-card__info">
                            <span className="admin-stat-card__value">
                                ₹{turfs.reduce((sum, t) => sum + (t.pricePerHour || 0), 0)}
                            </span>
                            <span className="admin-stat-card__label">Total Value/hr</span>
                        </div>
                    </div>
                </div>

                {/* Turfs Table */}
                <div className="admin-table-wrapper">
                    {loading ? (
                        <div className="admin-loading">Loading turfs...</div>
                    ) : turfs.length === 0 ? (
                        <div className="admin-empty">
                            <div className="admin-empty__icon">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                    <polyline points="9 22 9 12 15 12 15 22" />
                                </svg>
                            </div>
                            <h3>No turfs yet</h3>
                            <p>Get started by adding your first turf</p>
                            <Link to="/admin/turfs/new" className="btn btn--primary">
                                Add Turf
                            </Link>
                        </div>
                    ) : (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Turf</th>
                                    <th>Location</th>
                                    <th>Sport</th>
                                    <th>Price/hr</th>
                                    <th>Rating</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {turfs.map(turf => (
                                    <tr key={turf.id}>
                                        <td>
                                            <div className="admin-table__cell-title">
                                                {turf.imageUrl && (
                                                    <img
                                                        src={turf.imageUrl}
                                                        alt={turf.name}
                                                        className="admin-table__thumb"
                                                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                                    />
                                                )}
                                                <div>
                                                    <span className="admin-table__name">{turf.name}</span>
                                                    {turf.description && (
                                                        <span className="admin-table__desc">
                                                            {turf.description.substring(0, 60)}...
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="admin-badge admin-badge--location">
                                                {turf.location}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="admin-badge admin-badge--sport">
                                                {turf.sportsType || "—"}
                                            </span>
                                        </td>
                                        <td className="admin-table__price">
                                            ₹{turf.pricePerHour}
                                            <small>/hr</small>
                                        </td>
                                        <td>
                                            {turf.rating ? (
                                                <span className="admin-table__stars">
                                                    ⭐ {turf.rating}
                                                </span>
                                            ) : (
                                                <span className="admin-table__muted">—</span>
                                            )}
                                        </td>
                                        <td>
                                            <div className="admin-table__actions">
                                                <Link
                                                    to={`/admin/turfs/edit/${turf.id}`}
                                                    className="admin-btn admin-btn--edit"
                                                    title="Edit turf"
                                                >
                                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                    </svg>
                                                    Edit
                                                </Link>
                                                <button
                                                    className="admin-btn admin-btn--delete"
                                                    onClick={() => setDeleteId(turf.id!)}
                                                    title="Delete turf"
                                                >
                                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <polyline points="3 6 5 6 21 6" />
                                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                    </svg>
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Delete Confirmation Modal */}
                {deleteId !== null && (
                    <div className="admin-modal-overlay" onClick={() => setDeleteId(null)}>
                        <div className="admin-modal" onClick={e => e.stopPropagation()}>
                            <div className="admin-modal__icon">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                            </div>
                            <h3 className="admin-modal__title">Delete Turf?</h3>
                            <p className="admin-modal__text">
                                This action cannot be undone. This will permanently delete the turf and all associated data.
                            </p>
                            <div className="admin-modal__actions">
                                <button
                                    className="admin-btn admin-btn--cancel"
                                    onClick={() => setDeleteId(null)}
                                    disabled={deleting}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="admin-btn admin-btn--confirm-delete"
                                    onClick={() => handleDelete(deleteId)}
                                    disabled={deleting}
                                >
                                    {deleting ? "Deleting..." : "Delete"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default AdminTurfsPage;