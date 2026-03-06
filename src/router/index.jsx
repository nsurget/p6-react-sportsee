import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Dashboard from '../pages/Dashboard';
import ErrorPage from '../pages/Error';
import ProtectedRoute from '../components/ProtectedRoute';
import Layout from '../components/Layout';

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <Layout />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <Dashboard />,
            },
            {
                path: "dashboard",
                element: <Dashboard />,
            },
            {
                path: "profile",
                element: <Profile />,
            },
            {
                path: "*",
                element: <ErrorPage />,
            }
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
]);
