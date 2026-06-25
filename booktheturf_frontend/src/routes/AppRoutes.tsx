import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import TurfListPage from "../pages/TurfListPage";
import TurfDetailsPage from "../pages/TurfDetailsPage";
import ContactPage from "../pages/ContactPage";
import LoginPage from "../pages/LoginPage";
import AdminLeadsPage from "../pages/AdminLeadsPage";
import AdminTurfsPage from "../pages/AdminTurfsPage";
import AddTurfPage from "../pages/AddTurfPage";
import EditTurfPage from "../pages/EditTurfPage";
import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<HomePage />}
                />

                <Route
                    path="/turfs"
                    element={<TurfListPage />}
                />

                <Route
                    path="/turfs/:id"
                    element={<TurfDetailsPage />}
                />

                <Route
                    path="/contact"
                    element={<ContactPage />}
                />

                <Route
                    path="/admin/login"
                    element={<LoginPage />}
                />

                <Route
                    path="/admin/leads"
                    element={
                        <ProtectedRoute>
                            <AdminLeadsPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/turfs"
                    element={
                        <ProtectedRoute>
                            <AdminTurfsPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/turfs/new"
                    element={
                        <ProtectedRoute>
                            <AddTurfPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/turfs/edit/:id"
                    element={
                        <ProtectedRoute>
                            <EditTurfPage />
                        </ProtectedRoute>
                    }
                />
            </Routes>

        </BrowserRouter>
    );
}

export default AppRoutes;
