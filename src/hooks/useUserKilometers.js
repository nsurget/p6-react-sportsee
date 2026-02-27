import { useState, useEffect } from 'react';
import { fetchUserActivity } from '../services/apiServices';

const formatDate = (date) => {
    return date.toISOString().split('T')[0];
};

export function useUserKilometers(initialEndString = new Date().toISOString().split('T')[0]) {
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
                startDate.setDate(1); // 1er jour du mois

                const startMonthStr = formatDate(startDate);

                const todayForClamp = new Date();

                // Pour la fin du mois, on calcule le dernier jour du mois
                const endOfMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
                const safeEndDate = endOfMonth > todayForClamp ? todayForClamp : endOfMonth;
                const endMonthStr = formatDate(safeEndDate);

                const rawData = await fetchUserActivity(startMonthStr, endMonthStr);

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

    const nextMonth = () => {
        setEndDate(prev => {
            const nextDate = new Date(prev.getFullYear(), prev.getMonth() + 1, 1);
            const today = new Date();

            if (nextDate.getFullYear() === today.getFullYear() && nextDate.getMonth() === today.getMonth()) {
                return today;
            }
            if (nextDate > today) {
                return today;
            }
            return new Date(nextDate.getFullYear(), nextDate.getMonth() + 1, 0); // Dernier jour du mois
        });
    };

    const prevMonth = () => {
        setEndDate(prev => {
            return new Date(prev.getFullYear(), prev.getMonth(), 0); // Dernier jour du mois précédent
        });
    };

    const currentMonthLabel = (() => {
        const monthNames = [
            "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
            "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
        ];
        return `${monthNames[endDate.getMonth()]} ${endDate.getFullYear()}`;
    })();

    return {
        data,
        loading,
        error,
        nextMonth,
        prevMonth,
        endDate,
        currentMonthLabel
    };
}
