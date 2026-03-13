import { useUserInfo } from '../hooks/useUserInfo';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import './Profile.css';

export default function Profile() {
    const { data, loading, error } = useUserInfo(); // true = use mock data for now

    // Afficher le loader global
    if (loading) return <Loader />;

    // Gérer les erreurs globales
    if (error && !data) return <ErrorMessage message={error} />;

    if (!data) return <ErrorMessage message="Aucune donnée utilisateur trouvée." fullScreen={true} />;

    // Helpers
    const formatDuration = (totalMinutes) => {
        if (!totalMinutes) return { hours: 0, minutes: 0 };
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return { hours, minutes };
    };

    const duration = formatDuration(data.stats?.duration);

    return (
        <div className="profile-dashboard">
            <main className="profile-main">
                {/* Left Column */}
                <div className="profile-left-column">
                    <section className="profile-header-card">
                        <div className="profile-photo-container">
                            <img 
                                src={data.profilePicture} 
                                alt={`${data.firstName} ${data.lastName}`} 
                                className="profile-photo"
                            />
                        </div>
                        <div className="profile-header-text">
                            <h1 className="profile-name">
                                {data.firstName} {data.lastName}
                            </h1>
                            <p className="profile-member-since">
                                Membre depuis le {data.createdAt}
                            </p>
                        </div>
                    </section>

                    <section className="profile-info-card">
                        <div className="profile-info-header">
                            <h2 className="profile-info-title">Votre profil</h2>
                            <hr className="profile-info-divider" />
                        </div>
                        <div className="profile-info-list">
                            <p className="profile-info-item">Âge : {data.age}</p>
                            <p className="profile-info-item">
                                Genre : {data.gender === 'female' ? 'Femme' : 'Homme'}
                            </p>
                            <p className="profile-info-item">
                                Taille : {data.height ? `${(data.height / 100).toFixed(2).replace('.', 'm')}` : '-'}
                            </p>
                            <p className="profile-info-item">Poids : {data.weight}kg</p>
                        </div>
                    </section>
                </div>

                {/* Right Column */}
                <div className="profile-right-column">
                    <div className="profile-stats-header">
                        <h2 className="profile-stats-title">Vos statistiques</h2>
                        <p className="profile-stats-subtitle">depuis le {data.createdAt}</p>
                    </div>

                    <div className="profile-stats-grid">
                        {/* Column 1 */}
                        <div className="profile-stats-col">
                            <div className="profile-stat-card">
                                <p className="profile-stat-label">Temps total couru</p>
                                <div className="profile-stat-value-container">
                                    <p className="profile-stat-value">{duration.hours}h</p>
                                    <p className="profile-stat-unit">
                                        {duration.minutes > 0 ? `${duration.minutes}min` : ''}
                                    </p>
                                </div>
                            </div>
                            <div className="profile-stat-card">
                                <p className="profile-stat-label">Distance totale parcourue</p>
                                <div className="profile-stat-value-container">
                                    <p className="profile-stat-value">{data.stats?.distance || 0}</p>
                                    <p className="profile-stat-unit">km</p>
                                </div>
                            </div>
                            <div className="profile-stat-card">
                                <p className="profile-stat-label">Nombre de sessions</p>
                                <div className="profile-stat-value-container">
                                    <p className="profile-stat-value">{data.stats?.sessions || 0}</p>
                                    <p className="profile-stat-unit">sessions</p>
                                </div>
                            </div>
                        </div>

                        {/* Column 2 */}
                        <div className="profile-stats-col">
                            <div className="profile-stat-card">
                                <p className="profile-stat-label">Calories brûlées</p>
                                <div className="profile-stat-value-container">
                                    <p className="profile-stat-value">{data.stats?.calories || 0}</p>
                                    <p className="profile-stat-unit">cal</p>
                                </div>
                            </div>
                            <div className="profile-stat-card">
                                <p className="profile-stat-label">Nombre de jours de repos</p>
                                <div className="profile-stat-value-container">
                                    <p className="profile-stat-value">{data.stats?.restDays || 0}</p>
                                    <p className="profile-stat-unit">jours</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
