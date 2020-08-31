import React from 'react';
import './Header.scss';
import NavBar from './NavBar/NavBar';
import { APP_NAME } from './../../../constants/constants';

const Header = (props) => {
  return (
    <header className="Header">
      {APP_NAME}
      <NavBar />
    </header>
  )
}

export default Header;