import { useUserInfo } from '../hooks/useUserInfo';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Main from '../components/Main';
import './Dashboard.css';

export default function Dashboard() {
    const { data, loading, error } = useUserInfo();
    if (loading) return <div className="dashboard-loading">Chargement des données...</div>;
    if (error) return <div className="dashboard-error">Erreur: {error}</div>;
    if (!data) return <div className="dashboard-error">Aucune donnée trouvée.</div>;

    return (
        <div className="dashboard-container">
            <Header className="header">
                <Logo />
                <Nav />
            </Header>

            <Main className="dashboard-main">
                <section className="welcome-section">
                    <img src={data.profilePicture} alt="Photo de profil de l'utilisateur" />
                    <div className="user-info">
                        <h1><span className="firstname">{data.firstName}</span> <span className="lastname">{data.lastName}</span></h1>
                        <p>Membre depuis {data.createdAt}</p>
                        <div className="traveled-data">
                            <p>Distance totale parcourue</p>
                            <p><img src="./images/outline.svg" alt="" />{data.stats.distance.toFixed(0)} km</p>
                        </div>
                    </div>
                </section>

                <section className="dashboard-content">
                   
                </section>
            </Main>
        </div>
    );
}
