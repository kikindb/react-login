import React, { useState, useContext } from 'react';
import './RegisterUser.scss';
import API_BASE_URL from '../../../constants/constants';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import userContext from '../../../context/userContext';

const RegisterUser = (props) => {

  const { userData, setUserData } = useContext(userContext);

  const [state, setState] = useState({
    name: "",
    lastName: "",
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

  const registerUser = (e) => {
    e.preventDefault();
    console.log(state.email);
    console.log(state.password);
    console.log(API_BASE_URL);
    if (state.name.length && state.lastName.length && state.email.length && state.password.length) {
      //props.showError(null);
      const payload = {
        "name": state.name,
        "lastName": state.lastName,
        "email": state.email,
        "password": state.password,
      }
      axios.post(API_BASE_URL + '/api/users', payload)
        .then(function (response) {
          if (response.status === 201) {
            setState(prevState => ({
              ...prevState,
              'successMessage': 'User registered successful. Redirecting to home page..'
            }));
            localStorage.setItem('userToken', response.headers['x-auth-token']);
            setUserData({
              token: response.headers['x-auth-token'],
              user: response.data
            });
            history.push("/");
            //props.showError(null);
          } else {
            console.error("Some error ocurred.");
            //props.showError("Some error ocurred");
          }
        })
        .catch(function (error) {
          console.error(new Error(error.message));
          //alert(error.message);
        });
    } else {
      //props.showError('Please enter valid username and password');
      console.log('Please enter valid username and password');
    }
  }

  return (
    <div className="RegisterUser">
      <h1>Register Form</h1>
      <form onSubmit={registerUser}>

        <label htmlFor='name'>
          Name:
          <input type='text'
            id='name'
            name='name'
            placeholder="Enter name"
            value={state.name}
            onChange={handleChange} />
        </label>
        <label htmlFor='lastName'>
          Last Name:
          <input type='text'
            id='lastName'
            name='lastName'
            placeholder="Enter Last Name"
            value={state.lastName}
            onChange={handleChange} />
        </label>
        <label htmlFor='email'>
          Email:
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
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default RegisterUser;