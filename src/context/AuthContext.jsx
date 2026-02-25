import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

const isTokenValid = (token) => {
    if (!token) return false;

    try {
        // On récupère le payload du token (la deuxième partie)
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const payload = JSON.parse(jsonPayload);

        // On vérifie si l'expiration (exp) en secondes est dépassée
        if (payload.exp && (payload.exp * 1000 < Date.now())) {
            return false;
        }

        return true;
    } catch (error) {
        // Si le token est invalide
        console.error('Format de token invalide', error);
        return false;
    }
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isInitializing, setIsInitializing] = useState(true);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (isTokenValid(token)) {
            setIsAuthenticated(true);
        } else {
            if (token) localStorage.removeItem('token'); // Only remove if it existed
            setIsAuthenticated(false);
        }

        setIsInitializing(false);
    }, []);

    const login = (userData, token) => {
        setIsAuthenticated(true);
        setUserId(userData);
        localStorage.setItem('token', token);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserId(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isInitializing, userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    return context;
};
