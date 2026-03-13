import Logo from './Logo';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-copyright">
                <p>
                    ©Sportsee
                </p>
                <p>
                    Tous droits réservés
                </p>
            </div>
            <div className="footer-links">
                <p>
                    Conditions générales
                </p>
                <p>
                    Contact
                </p>
                <Logo className="footer-logo" onlyLottie = {true} />
            </div>
        </footer>
    );
}
