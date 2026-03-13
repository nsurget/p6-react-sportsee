import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Logo from './Logo';
import Nav from './Nav';

export default function Layout() {
    return (
        <div className="layout-container">
            <div className="container">
                <Header className="header">
                    <Logo />
                    <Nav />
                </Header>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}
