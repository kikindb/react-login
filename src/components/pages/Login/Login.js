import React, { useState, useContext } from 'react';
import './Login.scss';
import ROUTES from './../../../constants/routes';
import { API_BASE_URL } from './../../../constants/constants';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import userContext from '../../../context/userContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';


const Login = (props) => {

  const { userData, setUserData } = useContext(userContext);

  const history = useHistory();

  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string().required('Required').email('Invalid email format'),
    password: Yup.string().required('Required')
  });

  const onSubmit = values => {
    if (values.email.length && values.password.length) {
      const payload = {
        "email": values.email,
        "password": values.password,
      }
      axios.post(API_BASE_URL + '/api/auth', payload)
        .then(function (response) {
          if (response.status === 200) {
            localStorage.setItem('userToken', response.headers['x-auth-token']);
            setUserData({
              token: response.headers['x-auth-token'],
              user: response.data
            });
            history.push(ROUTES.MAIN);
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
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema
  });

  return (
    (!userData.user) ?
      <div className="Login">
        <h1>Login</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <input type='email'
              id='email'
              name='email'
              autoComplete="false"
              value={formik.values.email}
              placeholder=" "
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} />
            <label htmlFor='email'>Email</label>
            {formik.touched.email && formik.errors.email ?
              <span className="form-error">{formik.errors.email}</span> :
              null}
          </div>
          <div className="form-group">
            <input type='password'
              id='password'
              name='password'
              autoComplete="false"
              value={formik.values.password}
              placeholder=" "
              onBlur={formik.handleBlur}
              onChange={formik.handleChange} />
            <label htmlFor='password'>Password</label>
            {formik.touched.password && formik.errors.password ?
              <span className="form-error">{formik.errors.password}</span> :
              null}
          </div>
          <button type="submit">Sign in</button>
        </form>
        <Link to={ROUTES.SIGN_UP}>Register</Link>
      </div >
      : <>{history.push(ROUTES.MAIN)}</>
  )
};


export default Login;