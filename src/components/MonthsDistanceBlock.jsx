import React from 'react';
import MonthsDistanceChart from './MonthsDistanceChart';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import './MonthsDistanceBlock.css';

const MonthsDistanceBlock = ({
    averageKm,
    prevPeriod,
    dateRangeLabel,
    nextPeriod,
    endDateKilometers,
    chartData,
    loading,
    error
}) => {
    const isToday = endDateKilometers.toISOString().split('T')[0] === new Date().toISOString().split('T')[0];

    return (
        <div className="months-distance">
            {loading && <Loader />}
            {error && <ErrorMessage message={error} />}
            <div className="average-distance-navigation">
                <div className="average-label">
                    {averageKm}km en moyenne
                </div>
                <div className="navigation-controls">
                    <button onClick={prevPeriod} className="nav-btn prev">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 9" fill="none">
                            <path d="M0.5 8.5L4.5 4.5L0.5 0.5" stroke="currentColor" strokeLinecap="round" />
                        </svg>
                    </button>
                    <p className="date-range">{dateRangeLabel}</p>
                    <button
                        onClick={nextPeriod}
                        disabled={isToday}
                        className="nav-btn"
                        style={{ opacity: isToday ? 0.3 : 1 }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 9" fill="none">
                            <path d="M0.5 8.5L4.5 4.5L0.5 0.5" stroke="currentColor" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="total-distance-label">Total des kilomètres 4 dernières semaines</div>
            <MonthsDistanceChart data={chartData} />
        </div>
    );
};

export default MonthsDistanceBlock;
