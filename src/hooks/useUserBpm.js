import { useState, useEffect } from 'react';
import { fetchUserActivity } from '../services/apiServices';

const formatDate = (date) => {
    return date.toISOString().split('T')[0];
};

export function useUserBpm(initialEndString = '2025-02-25', weekNumber = 1) {
    const [endDate, setEndDate] = useState(new Date(initialEndString));
    const [data, setData] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [averageBpm, setAverageBpm] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        async function loadData() {
            try {
                setLoading(true);
                setError(null);

                const startDate = new Date(endDate);

                // On recule en fonction du jour de la semaine pour avoir le lundi
                const dayOfWeek = startDate.getDay();
                const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
                startDate.setDate(startDate.getDate() - daysToSubtract);
                startDate.setDate(startDate.getDate() - (weekNumber - 1) * 7);

                const startWeekStr = formatDate(startDate);

                // On s'assure que endWeekStr ne dépasse pas aujourd'hui
                const todayForClamp = new Date();
                const safeEndDate = endDate > todayForClamp ? todayForClamp : endDate;
                const endWeekStr = formatDate(safeEndDate);
                console.log(startWeekStr, endWeekStr);

                const rawData = await fetchUserActivity(startWeekStr, endWeekStr);

                if (isMounted) {
                    setData(rawData);

                    const days = [
                        { name: 'Lun', min: null, max: null, moy: null, formattedDate: '' },
                        { name: 'Mar', min: null, max: null, moy: null, formattedDate: '' },
                        { name: 'Mer', min: null, max: null, moy: null, formattedDate: '' },
                        { name: 'Jeu', min: null, max: null, moy: null, formattedDate: '' },
                        { name: 'Ven', min: null, max: null, moy: null, formattedDate: '' },
                        { name: 'Sam', min: null, max: null, moy: null, formattedDate: '' },
                        { name: 'Dim', min: null, max: null, moy: null, formattedDate: '' }
                    ];

                    let totalBpm = 0;
                    let countBpm = 0;

                    const normalizedStart = new Date(startWeekStr);
                    normalizedStart.setHours(0, 0, 0, 0);

                    for (let i = 0; i < 7; i++) {
                        const d = new Date(normalizedStart);
                        d.setDate(d.getDate() + i);
                        days[i].formattedDate = d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
                    }

                    if (Array.isArray(rawData)) {
                        rawData.forEach(session => {
                            const sessionDate = new Date(session.date);
                            sessionDate.setHours(12, 0, 0, 0);

                            const diffTime = sessionDate - normalizedStart;
                            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

                            if (diffDays >= 0 && diffDays < 7 && session.heartRate) {
                                days[diffDays].min = session.heartRate.min || 0;
                                days[diffDays].max = session.heartRate.max || 0;
                                days[diffDays].moy = session.heartRate.average || 0;

                                totalBpm += session.heartRate.average || 0;
                                countBpm++;
                            }
                        });
                    }

                    // On ne garde dans le chartData que les jours qui ont une donnée pour éviter les points à zéro sur la courbe (ou on les laisse à zéro si c'est voulu)
                    setChartData(days);
                    setAverageBpm(countBpm > 0 ? Math.round(totalBpm / countBpm) : 0);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message || 'Failed to fetch user activity');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        loadData();

        return () => {
            isMounted = false;
        };
    }, [endDate]);

    const nextWeek = () => {
        setEndDate(prev => {
            const next = new Date(prev);
            next.setDate(next.getDate() + 7);

            // Empêcher d'aller dans le futur
            const today = new Date();
            today.setHours(23, 59, 59, 999);

            if (next > today) {
                return today; // On reste sur la semaine actuelle
            }
            return next;
        });
    };

    const prevWeek = () => {
        setEndDate(prev => {
            const prevDate = new Date(prev);
            const dayOfWeek = prevDate.getDay();
            const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
            prevDate.setDate(prevDate.getDate() - daysToSubtract);
            prevDate.setDate(prevDate.getDate() - 1);
            return prevDate;
        });
    };

    // Derived states for presentation
    const currentWeekRangeLabel = (() => {
        const start = new Date(endDate);
        // On recule en fonction du jour de la semaine pour avoir le lundi
        const dayOfWeek = start.getDay();
        const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        start.setDate(start.getDate() - daysToSubtract);

        const endOfWeek = new Date(start);
        endOfWeek.setDate(start.getDate() + 6); // Dimanche de cette semaine
        if (endOfWeek > new Date()) {
            endOfWeek.setDate(new Date().getDate());
        }

        return `${start.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} - ${endOfWeek.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}`;
    })();

    return {
        data,
        chartData,
        averageBpm,
        loading,
        error,
        nextWeek,
        prevWeek,
        endDate,
        currentWeekRangeLabel
    };
}
