import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import ProtectedRoute from '../components/ProtectedRoute';

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <Profile />
            </ProtectedRoute>
        ),
    },
    {
        path: "/login",
        element: (
            <Login />
        ),
    },
    {
        path: "/profile",
        element: (
            <ProtectedRoute>
                <Profile />
            </ProtectedRoute>
        ),
    }
]);
