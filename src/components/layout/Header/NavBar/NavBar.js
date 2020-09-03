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
          <NavLink className="nav-link" to={ROUTES.LOGIN}><span>Login</span></NavLink>
          <NavLink className="nav-link" to={ROUTES.SIGN_UP}><span>Register</span></NavLink>
        </> :
        <>
          <NavLink className="nav-link" exact to="/"><span>Home</span></NavLink>
          <NavLink className="nav-link" exact to={ROUTES.LOGIN} onClick={logout}>
            <img src={userData.user.picture} />
            <span>{userData.user.name}</span>
          </NavLink>
        </>
      }
    </nav>
  )
}

export default NavBar;