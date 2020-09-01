import React, { useState, useContext } from 'react';
import './Login.scss';
import ROUTES from './../../../constants/routes';
import { API_BASE_URL } from './../../../constants/constants';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import userContext from '../../../context/userContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import FlashMessage from '../../layout/FlashMessage/FlashMessage';

const Login = (props) => {

  const history = useHistory();

  const { userData, setUserData } = useContext(userContext);

  const [state, setState] = useState({
    error: ""
  });

  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string().required('Required').email('Invalid email format'),
    password: Yup.string().required('Required')
  });

  const onSubmit = (values, onSubmitProps) => {
    try {
      setState({
        'error': ''
      });
      if (values.email.length && values.password.length) {
        const payload = {
          "email": values.email,
          "password": values.password,
        }
        let res;
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
            setState({
              'error': "Connection Error Try Again Later"
            });
            if (error.response) {
              setState({
                'error': error.response.data
              });
              /*console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);*/
            }
            onSubmitProps.setSubmitting(false);
          });
      } else {
        console.log('Please enter valid username and password');
        onSubmitProps.setSubmitting(false);
      }
    } catch (error) {
      console.error(new Error('Fatal Error'));
    }
  };

  return (
    (!userData.user) ?
      <div className="Login">
        <h1>Login</h1>

        {(state.error !== "") ? <FlashMessage message={state.error} visible={true} /> : null}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {
            formik => {
              return (
                <Form>
                  <div className="form-group">
                    <Field type='email'
                      id='email'
                      name='email'
                      autoComplete="false"
                      placeholder=" "
                    />
                    <label htmlFor='email'>Email</label>
                    <span className="form-error"><ErrorMessage name='email' /></span>
                  </div>
                  <div className="form-group">
                    <Field type='password'
                      id='password'
                      name='password'
                      autoComplete="false"
                      placeholder=" "
                    />
                    <label htmlFor='password'>Password</label>
                    <span className="form-error"><ErrorMessage name='password' /></span>
                  </div>
                  <button type="submit" disabled={!(formik.dirty && formik.isValid) || (formik.isSubmitting)}>Sign in</button>
                </Form>
              );
            }
          }
        </Formik>
        <Link to={ROUTES.SIGN_UP}>Register</Link>
      </div >
      : <>{history.push(ROUTES.MAIN)}</>
  )
};

export default Login;