import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import './Logo.css';

export default function Logo({ className, onlyLottie }) {
    return (
        <div className={`logo-container ${className || ''}`}>
            <DotLottieReact
                src="/images/logo-sportsee.lottie"
                loop
                autoplay
                className={"lottie"} />
            {!onlyLottie ? (
                <img src="/images/logo-no-picto.svg" alt="SportSee Logo" className={"logo"} />
            ) : null}
        </div>


    );
}
