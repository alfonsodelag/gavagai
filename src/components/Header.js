import React from 'react';
import Logo from '../assets/images/image.svg';

function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark justify-content-between wrapper">
            <img className="logo" src={Logo} alt="logo" />
        </nav>
    );
}

export default Header;
