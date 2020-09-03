import React from 'react';
import './Header.scss';
import NavBar from './NavBar/NavBar';
import ROUTES from './../../../constants/routes';
import { Link } from 'react-router-dom';
import { APP_NAME } from './../../../constants/constants';

const Header = (props) => {
  return (
    <header className="Header">
      <div className="header-container">
        <Link className="site-title" to={ROUTES.MAIN}>
          {APP_NAME}
        </Link>
        <NavBar />
      </div>
    </header>
  )
}

export default Header;