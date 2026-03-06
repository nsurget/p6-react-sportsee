import { Outlet } from 'react-router-dom';
import Header from './Header';
import Logo from './Logo';
import Nav from './Nav';

export default function Layout() {
    return (
        <div className="layout-container container">
            <Header className="header">
                <Logo />
                <Nav />
            </Header>
            <Outlet />
        </div>
    );
}
