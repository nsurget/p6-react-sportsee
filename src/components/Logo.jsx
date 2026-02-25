import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import './Logo.css';

export default function Logo({ className }) {
    return (
        <div className="logo-container">
            <DotLottieReact
                src="/images/logo-sportsee.lottie"
                loop
                autoplay
                className={"lottie"} />
            <img src="/images/logo-no-picto.svg" alt="SportSee Logo" className={"logo"} />
        </div>


    );
}
