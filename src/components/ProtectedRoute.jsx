import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();

    // If the user isn't authenticated, we redirect to login ("page de connexion")
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
