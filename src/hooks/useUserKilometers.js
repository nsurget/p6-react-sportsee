import { useState, useEffect } from 'react';
import { fetchUserActivity } from '../services/apiServices';

const formatDate = (date) => {
    const d = new Date(date);
    d.setHours(12, 0, 0, 0); // avoid timezone issues
    return d.toISOString().split('T')[0];
};

export function useUserKilometers(initialEndString = new Date().toISOString().split('T')[0]) {
    const [endDate, setEndDate] = useState(new Date(initialEndString));
    const [data, setData] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [averageKm, setAverageKm] = useState(0);
    const [dateRangeLabel, setDateRangeLabel] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        async function loadData() {
            try {
                setLoading(true);
                setError(null);

                const currentEnd = new Date(endDate);
                const startDay = new Date(currentEnd);
                startDay.setDate(startDay.getDate() - 27); // 28 jours au total: de J-27 à J-0

                const startMonthStr = formatDate(startDay);
                const endMonthStr = formatDate(currentEnd);

                const rawData = await fetchUserActivity(startMonthStr, endMonthStr);

                if (isMounted) {
                    setData(rawData);

                    const monthNames = [
                        "janvier", "février", "mars", "avril", "mai", "juin",
                        "juillet", "août", "septembre", "octobre", "novembre", "décembre"
                    ];
                    setDateRangeLabel(`${startDay.getDate()} ${monthNames[startDay.getMonth()]} - ${currentEnd.getDate()} ${monthNames[currentEnd.getMonth()]}`);

                    const weeks = [
                        { name: 'S1', dateRange: '', km: 0 },
                        { name: 'S2', dateRange: '', km: 0 },
                        { name: 'S3', dateRange: '', km: 0 },
                        { name: 'S4', dateRange: '', km: 0 }
                    ];

                    const normalizedStart = new Date(startMonthStr);
                    normalizedStart.setHours(0, 0, 0, 0);

                    for (let i = 0; i < 4; i++) {
                        const weekStart = new Date(normalizedStart);
                        weekStart.setDate(weekStart.getDate() + (i * 7));
                        const weekEnd = new Date(weekStart);
                        weekEnd.setDate(weekEnd.getDate() + 6);

                        const formatDayMonth = (d) => `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}`;

                        weeks[i].dateRange = `${formatDayMonth(weekStart)} au ${formatDayMonth(weekEnd)}`;
                    }

                    let totalKm = 0;

                    if (Array.isArray(rawData)) {
                        rawData.forEach(session => {
                            const sessionDate = new Date(session.date);
                            sessionDate.setHours(12, 0, 0, 0);

                            const diffTime = sessionDate - normalizedStart;
                            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                            const weekIndex = Math.floor(diffDays / 7);

                            if (weekIndex >= 0 && weekIndex < 4) {
                                const distance = Number(session.distance || session.kilometers || 0);
                                weeks[weekIndex].km += distance;
                                totalKm += distance;
                            }
                        });
                    }

                    setChartData(weeks.map(w => ({ ...w, km: Math.round(w.km) })));
                    setAverageKm(Math.round(totalKm / 4));
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

    const nextPeriod = () => {
        setEndDate(prev => {
            const nextDate = new Date(prev);
            nextDate.setDate(nextDate.getDate() + 28);
            const today = new Date();

            if (nextDate > today) {
                return today;
            }
            return nextDate;
        });
    };

    const prevPeriod = () => {
        setEndDate(prev => {
            const newDate = new Date(prev);
            newDate.setDate(newDate.getDate() - 28);
            return newDate;
        });
    };

    return {
        data,
        chartData,
        averageKm,
        dateRangeLabel,
        loading,
        error,
        nextPeriod,
        prevPeriod,
        endDate,
    };
}

