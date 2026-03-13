import React from 'react';
import WeekBpmChart from './WeekBpmChart';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import './WeekBpmBlock.css';

const WeekBpmBlock = ({
    averageBpm,
    prevWeek,
    currentWeekRangeLabel,
    nextWeek,
    endDateActivity,
    chartData,
    loading,
    error
}) => {
    const isToday = endDateActivity.toISOString().split('T')[0] === new Date().toISOString().split('T')[0];

    return (
        <div className="week-bpm">
            {loading && <Loader />}
            {error && <ErrorMessage message={error} />}
            <div className="average-bpm-navigation">
                <div className="average-label red">
                    {averageBpm} BPM en moyenne
                </div>
                <div className="navigation-controls">
                    <button onClick={prevWeek} className="nav-btn prev">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 9" fill="none">
                            <path d="M0.5 8.5L4.5 4.5L0.5 0.5" stroke="#111111" strokeLinecap="round" />
                        </svg>
                    </button>
                    <p className="date-range">{currentWeekRangeLabel}</p>
                    <button
                        onClick={nextWeek}
                        disabled={isToday}
                        className="nav-btn"
                        style={{ opacity: isToday ? 0.3 : 1 }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 9" fill="none">
                            <path d="M0.5 8.5L4.5 4.5L0.5 0.5" stroke="#111111" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="heart-rate-label">Fréquence cardiaque moyenne</div>
            <WeekBpmChart data={chartData} />
        </div>
    );
};

export default WeekBpmBlock;
