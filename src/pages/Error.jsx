import Logo from "../components/Logo";
import Nav from "../components/Nav";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";

export default function Error() {
    const { isAuthenticated } = useAuth();
    
    return (
        <div className="error-page">
            <Header className="error-header">
                <Logo />
                {isAuthenticated ? <Nav /> : null}
            </Header>
            <main className="error-main">
                <h1>Erreur 404</h1>
                <p>La page que vous recherchez n'existe pas.</p>
            </main>
        </div>
    );
}