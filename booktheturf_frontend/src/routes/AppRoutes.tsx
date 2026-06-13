import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import TurfListPage from "../pages/TurfListPage";
import TurfDetailsPage from "../pages/TurfDetailsPage";
import ContactPage from "../pages/ContactPage";
import AdminLeadsPage from "../pages/AdminLeadsPage";

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

            </Routes>

        </BrowserRouter>
    );
}

export default AppRoutes;