import { useUserInfo } from '../hooks/useUserInfo';
import { useUserBpm } from '../hooks/useUserBpm';
import { useUserKilometers } from '../hooks/useUserKilometers';
import Main from '../components/Main';
import MonthsDistanceBlock from '../components/MonthsDistanceBlock';
import WeekBpmBlock from '../components/WeekBpmBlock';
import './Dashboard.css';

export default function Dashboard() {
    const { data: userInfo, loading: infoLoading, error: infoError } = useUserInfo();
    const {
        data: activityData,
        chartData: bpmChartData,
        averageBpm,
        loading: activityLoading,
        error: activityError,
        nextWeek,
        prevWeek,
        currentWeekRangeLabel,
        endDate: endDateActivity
    } = useUserBpm(new Date().toISOString().split('T')[0]);

    const {
        data: kilometersData,
        chartData,
        averageKm,
        dateRangeLabel,
        loading: kilometersLoading,
        error: kilometersError,
        nextPeriod,
        prevPeriod,
        endDate: endDateKilometers
    } = useUserKilometers(new Date().toISOString().split('T')[0]);


    // Afficher le loader global uniquement lors du premier chargement (quand on n'a pas encore de données pour afficher l'UI)
    if (infoLoading || (activityLoading && !activityData) || (kilometersLoading && !kilometersData)) {
        return <div className="dashboard-loading">Chargement des données...</div>;
    }

    // Gérer les potentielles erreurs
    if (infoError || activityError || kilometersError) {
        return <div className="dashboard-error">Erreur lors du chargement des données.</div>;
    }

    if (!userInfo) return <div className="dashboard-error">Aucune donnée trouvée.</div>;

    return (
        <div className="dashboard-container">
            <Main className="main">
                <section className="welcome-section">
                    <div className="welcome-user">
                        <img src={userInfo.profilePicture} alt="Photo de profil de l'utilisateur" className="profile-picture" />
                        <div className="user-info">
                            <h1><span className="firstname">{userInfo.firstName}</span> <span className="lastname">{userInfo.lastName}</span></h1>
                            <p className="member-since">Membre depuis {userInfo.createdAt}</p>
                        </div>
                    </div>
                    <div className="traveled-data">
                        <p className="traveled-label">Distance totale parcourue</p>
                        <div className="traveled-badge">
                            <img src="/images/outline.svg" alt="" />
                            <span>{userInfo.stats.distance.toFixed(0)} km</span>
                        </div>
                    </div>
                </section>

                <section className="last-performances">
                    <h3>Vos dernières performances</h3>
                    <div className="performances-container">
                        <MonthsDistanceBlock
                            averageKm={averageKm}
                            prevPeriod={prevPeriod}
                            dateRangeLabel={dateRangeLabel}
                            nextPeriod={nextPeriod}
                            endDateKilometers={endDateKilometers}
                            chartData={chartData}
                        />
                        <WeekBpmBlock
                            averageBpm={averageBpm}
                            prevWeek={prevWeek}
                            currentWeekRangeLabel={currentWeekRangeLabel}
                            nextWeek={nextWeek}
                            endDateActivity={endDateActivity}
                            chartData={bpmChartData}
                        />
                    </div>
                </section>

            </Main>
        </div>
    );
}
