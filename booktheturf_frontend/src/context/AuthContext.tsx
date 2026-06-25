import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { isAuthenticated, login as authLogin, logout as authLogout } from "../api/authService";

interface AuthContextType {
    isAuth: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuth, setIsAuth] = useState(isAuthenticated());

    useEffect(() => {
        setIsAuth(isAuthenticated());
    }, []);

    const login = async (username: string, password: string) => {
        await authLogin(username, password);
        setIsAuth(true);
    };

    const logout = () => {
        authLogout();
        setIsAuth(false);
    };

    return (
        <AuthContext.Provider value={{ isAuth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return ctx;
}