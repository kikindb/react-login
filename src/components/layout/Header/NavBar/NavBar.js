import React, { useContext } from 'react';
import './NavBar.scss';
import ROUTES from './../../../../constants/routes';
import { Link } from 'react-router-dom';
import userContext from '../../../../context/userContext';

const NavBar = (props) => {
  const { userData, setUserData } = useContext(userContext);
  const logout = () => {

    setUserData({
      token: undefined,
      user: undefined
    });
    localStorage.setItem('userToken', '');
  };
  return (
    <nav className="NavBar">
      <Link to="/">Home</Link>
      {(!userData.user) ?
        <>
          <Link to={ROUTES.LOGIN}>Login</Link>
          <Link to={ROUTES.SIGN_UP}>Register</Link>
        </> :
        <button onClick={logout}>Logout {userData.user.name}</button>
      }
    </nav>
  )
}

export default NavBar;