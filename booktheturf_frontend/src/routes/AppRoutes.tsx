import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import TurfListPage from "../pages/TurfListPage";
import TurfDetailsPage from "../pages/TurfDetailsPage";
import ContactPage from "../pages/ContactPage";
import AdminLeadsPage from "../pages/AdminLeadsPage";
import AdminTurfsPage from "../pages/AdminTurfsPage";
import AddTurfPage from "../pages/AddTurfPage";
import EditTurfPage from "../pages/EditTurfPage";

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
                    path="/admin/leads"
                    element={<AdminLeadsPage />}
                />

                <Route
                    path="/admin/turfs"
                    element={<AdminTurfsPage />}
                />

                <Route
                    path="/admin/turfs/new"
                    element={<AddTurfPage />}
                />

                <Route
                    path="/admin/turfs/edit/:id"
                    element={<EditTurfPage />}
                />
            </Routes>

        </BrowserRouter>
    );
}

export default AppRoutes;