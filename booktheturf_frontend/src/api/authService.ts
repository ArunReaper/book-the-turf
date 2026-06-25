import turfApi from "./turfApi";

interface LoginResponse {
    token: string;
}

const TOKEN_KEY = "booktheturf_admin_token";

export const login = async (
    username: string,
    password: string
): Promise<string> => {
    const response = await turfApi.post<LoginResponse>("/auth/login", {
        username,
        password,
    });
    const token = response.data.token;
    localStorage.setItem(TOKEN_KEY, token);
    return token;
};

export const logout = (): void => {
    localStorage.removeItem(TOKEN_KEY);
};

export const getToken = (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
};

export const isAuthenticated = (): boolean => {
    const token = getToken();
    if (!token) return false;

    try {
        // Decode JWT payload (base64) to check expiry
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.exp * 1000 > Date.now();
    } catch {
        return false;
    }
};