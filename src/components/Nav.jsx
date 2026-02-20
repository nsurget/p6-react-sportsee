import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Nav({ className }) {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className={className}>

            <button onClick={handleLogout} className="logout-btn">Déconnexion</button>

        </nav>
    );
}