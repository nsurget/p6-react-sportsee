import { useState, useEffect } from 'react';
import { fetchUserActivity } from '../services/apiServices';

const formatDate = (date) => {
    return date.toISOString().split('T')[0];
};

export function useUserBpm(initialEndString = '2025-02-25', weekNumber = 1) {
    const [endDate, setEndDate] = useState(new Date(initialEndString));
    const [data, setData] = useState(null);
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
        loading,
        error,
        nextWeek,
        prevWeek,
        endDate,
        currentWeekRangeLabel
    };
}
