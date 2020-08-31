import React from 'react';
import './Header.scss';
import NavBar from './NavBar/NavBar';

const Header = (props) => {
  return (
    <header className="Header">
      My First Login
      <NavBar />
    </header>
  )
}

export default Header;