import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }: { children: ReactNode }) {
    const { isAuth } = useAuth();

    if (!isAuth) {
        return <Navigate to="/admin/login" replace />;
    }

    return <>{children}</>;
}

export default ProtectedRoute;