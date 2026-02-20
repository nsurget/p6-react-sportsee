
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/apiServices';
import Logo from '../components/Logo';
import './Login.css';
import LoginForm from '../components/LoginForm';

export default function Login() {
    const [apiError, setApiError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            setApiError(null);
            setIsLoading(true);
            // data.email maps to the API's username field according to brief
            const response = await loginUser(data.username, data.password);
            login(response.userId, response.token);
            navigate('/profile');
        } catch (err) {
            setApiError(err.message || 'La connexion a échoué. Vérifiez vos identifiants.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-left">
                <Logo className="login-logo" />

                <LoginForm onSubmit={onSubmit} isLoading={isLoading} apiError={apiError} />
            </div>
            <div className="login-right">
                <img src="/images/login-hero.jpg" alt="SportSee Hero" />
            </div>
        </div>
    );
}
