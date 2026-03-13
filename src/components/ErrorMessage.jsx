import React from 'react';
import './ErrorMessage.css';

export default function ErrorMessage({ message, fullScreen = false }) {
    return (
        <div className={`error-container ${fullScreen ? 'full-screen' : ''}`}>
            <p className="error-text">{message || "Une erreur est survenue lors du chargement des données."}</p>
        </div>
    );
}
