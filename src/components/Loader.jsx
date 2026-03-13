import React from 'react';
import './Loader.css';

export default function Loader({ fullScreen = false }) {
    return (
        <div className={`loader-container ${fullScreen ? 'full-screen' : ''}`}>
            <div className="spinner"></div>
            <p className="loader-text">Chargement en cours...</p>
        </div>
    );
}
