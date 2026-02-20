import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);

    // In a real app we would check localStorage/sessionStorage here
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            // Optional: decode token to set user
        }
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
        <AuthContext.Provider value={{ isAuthenticated, userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    return context;
};
