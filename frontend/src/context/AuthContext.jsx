import { createContext, useContext, useState } from 'react';

const AUTH_STORAGE_KEY = 'notes_auth';
const AuthContext = createContext(null);

const getStoredAuth = () => {
    try {
        return JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY)) || null;
    } catch {
        return null;
    }
};

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(getStoredAuth);

    const login = (authData) => {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
        setAuth(authData);
    };

    const logout = () => {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        setAuth(null);
    };

    return (
        <AuthContext.Provider value={{ ...auth, isAuthenticated: Boolean(auth?.token), login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
