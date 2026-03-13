import React, { useMemo } from 'react';
import { PieChart, Pie, ResponsiveContainer, Tooltip } from 'recharts';
import './WeekGoalsBlock.css';

export default function WeekGoalsBlock({ activityData, currentWeekRangeLabel, currentWeekNumericRangeLabel }) {
    const GOAL_SESSIONS = 6;

    const stats = useMemo(() => {
        let realizedSessions = 0;
        let totalDuration = 0;
        let totalDistance = 0;

        if (activityData && Array.isArray(activityData)) {
            // Dans useUserBpm, activityData contient l'activité de la période sélectionnée (la semaine)
            activityData.forEach(session => {
                if (session.duration > 0 || session.distance > 0) {
                    realizedSessions++;
                }
                totalDuration += (session.duration || 0);
                totalDistance += (parseFloat(session.distance) || 0);
            });
        }

        return {
            realizedSessions,
            remainingSessions: Math.max(0, GOAL_SESSIONS - realizedSessions),
            totalDuration,
            totalDistance: totalDistance.toFixed(1)
        };
    }, [activityData]);

    const pieData = [
        { name: 'Restants', value: stats.remainingSessions, fill: '#b6bdfc' },
        { name: 'Réalisées', value: stats.realizedSessions, fill: '#0b23f4' },
    ];

    return (
        <section className="this-week">
            <div className="this-week-header">
                <h3>Cette semaine</h3>
                <p>Du {currentWeekNumericRangeLabel}</p>
            </div>

            <div className="this-week-content">
                <div className="week-goals-card">
                    <div className="week-goals-info">
                        <div className="main-value">
                            <span className="value-number">x{stats.realizedSessions}</span>
                            <span className="value-label">sur objectif de {GOAL_SESSIONS}</span>
                        </div>
                        <p className="subtitle">Courses hebdomadaire réalisées</p>
                    </div>

                    <div className="pie-chart-container">
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius="45%"
                                    outerRadius="80%"
                                    startAngle={90}
                                    endAngle={-270}
                                    dataKey="value"
                                    stroke="none"
                                />
                                <Tooltip cursor={false} content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="pie-legends">

                            <div className="legend-item">
                                {stats.remainingSessions > 0 && (
                                    <>
                                        <span className="legend-color" style={{ backgroundColor: '#b6bdfc' }}></span>
                                        <span className="legend-text">{stats.remainingSessions} restants</span>
                                    </>
                                )}
                            </div>
                            <div className="legend-item">
                                <span className="legend-color" style={{ backgroundColor: '#0b23f4' }}></span>
                                <span className="legend-text">{stats.realizedSessions} réalisées</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="week-stats-cards">
                    <div className="stat-card">
                        <p className="stat-label">Durée d’activité</p>
                        <div className="stat-value">
                            <span className="duration-value">{stats.totalDuration}</span>
                            <span className="duration-unit">minutes</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <p className="stat-label">Distance</p>
                        <div className="stat-value">
                            <span className="distance-value">{stats.totalDistance}</span>
                            <span className="distance-unit">kilomètres</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip" style={{ backgroundColor: 'white', padding: '5px 10px', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                <p className="label" style={{ margin: 0, fontSize: '12px', color: '#707070' }}>{`${payload[0].name} : ${payload[0].value}`}</p>
            </div>
        );
    }
    return null;
};
