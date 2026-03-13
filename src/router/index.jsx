import { useEffect } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Dashboard from '../pages/Dashboard';
import ErrorPage from '../pages/Error';
import ProtectedRoute from '../components/ProtectedRoute';
import Layout from '../components/Layout';

// Composant utilitaire pour mettre à jour le titre de la page
const PageTitle = ({ title, children }) => {
    useEffect(() => {
        document.title = title || 'SportSee';
    }, [title]);

    return children;
};

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
                element: <PageTitle title="Dashboard | SportSee"><Dashboard /></PageTitle>,
                
            },
            {
                path: "dashboard",
                element: <PageTitle title="Dashboard | SportSee"><Dashboard /></PageTitle>,
            },
            {
                path: "profile",
                element: <PageTitle title="Profil | SportSee"><Profile /></PageTitle>,
            },
            {
                path: "*",
                element: <PageTitle title="Erreur 404 | SportSee"><ErrorPage /></PageTitle>,
            }
        ],
    },
    {
        path: "/login",
        element: <PageTitle title="Connexion | SportSee"><Login /></PageTitle>,
    },
]);
