import { useUserInfo } from '../hooks/useUserInfo';

export default function Profile() {
    const { data, loading, error } = useUserInfo(); // true = use mock data for now




    if (loading) return <div className="profile-loading">Chargement des données...</div>;
    if (error) return <div className="profile-error">Erreur: {error}</div>;
    if (!data) return <div className="profile-error">Aucune donnée trouvée.</div>;

    return (
        <div className="profile-dashboard">
            <main className="profile-main">
                <section className="welcome-section">
                    <h1><span className="firstname">{data.firstName}</span></h1>
                </section>

                <section className="dashboard-content">
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </section>
            </main>
        </div>
    );
}
