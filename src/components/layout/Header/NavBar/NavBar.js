import React, { useContext } from 'react';
import './NavBar.scss';
import ROUTES from './../../../../constants/routes';
import { NavLink } from 'react-router-dom';
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
      {(!userData.user) ?
        <>
          <NavLink className="nav-link" to={ROUTES.LOGIN}>Login</NavLink>
          <NavLink className="nav-link" to={ROUTES.SIGN_UP}>Register</NavLink>
        </> :
        <>
          <NavLink className="nav-link" exact to="/">Home</NavLink>
          <NavLink className="nav-link" exact to={ROUTES.LOGIN} onClick={logout}>
            <img src={userData.user.picture} />
            Logout {userData.user.name}
          </NavLink>
        </>
      }
    </nav>
  )
}

export default NavBar;