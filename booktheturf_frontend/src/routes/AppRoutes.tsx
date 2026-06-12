import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import TurfListPage from "../pages/TurfListPage";
import TurfDetailsPage from "../pages/TurfDetailsPage";

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

            </Routes>

        </BrowserRouter>
    );
}

export default AppRoutes;