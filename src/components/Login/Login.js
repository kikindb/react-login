import React, { useState, useContext } from 'react';
import './Login.scss';
import API_BASE_URL from './../../constants/constants';
import { useHistory, Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import userContext from './../../context/userContext';


const Login = (props) => {

  const { userData, setUserData } = useContext(userContext);

  const [state, setState] = useState({
    email: "",
    password: ""
  });

  const history = useHistory();

  const handleChange = (e) => {
    const { id, value } = e.target
    setState(prevState => ({
      ...prevState,
      [id]: value
    }));
  }

  const login = (e) => {
    e.preventDefault();
    sendDetailsToServer();
  }

  const sendDetailsToServer = () => {
    if (state.email.length && state.password.length) {
      //props.showError(null);
      const payload = {
        "email": state.email,
        "password": state.password,
      }
      axios.post(API_BASE_URL + '/api/auth', payload)
        .then(function (response) {
          if (response.status === 200) {
            setState(prevState => ({
              ...prevState,
              'successMessage': 'Login successful. Redirecting to home page..'
            }));
            localStorage.setItem('userToken', response.headers['x-auth-token']);
            setUserData({
              token: response.headers['x-auth-token'],
              user: response.data
            });
            history.push("/");
          } else {
            console.error("Some error ocurred.");
          }
        })
        .catch(function (error) {
          console.error(new Error(error.message));
        });
    } else {
      console.log('Please enter valid username and password');
    }
  }
  return (
    (!userData.user) ?
      <div className="Login">
        <form onSubmit={login}>
          <label htmlFor='email'>
            Email
          <input type='email'
              id='email'
              name='email'
              placeholder="Enter email"
              value={state.email}
              onChange={handleChange} />
          </label>
          <label htmlFor='password'>
            Password:
          <input type='password'
              id='password'
              name='password'
              placeholder="Password"
              value={state.password}
              onChange={handleChange} />
          </label>
          <button>Sign in</button>
        </form>
        <Link to="/register">Register</Link>
      </div>
      : <>{history.push('/')}</>
  )
};


export default Login;