import React, { useContext } from 'react';
import './NavBar.scss';
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
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </> :
        <button onClick={logout}>Logout {userData.user.name}</button>
      }
    </nav>
  )
}

export default NavBar;