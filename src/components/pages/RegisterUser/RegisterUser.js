import React, { useState, useContext } from 'react';
import './RegisterUser.scss';
import { API_BASE_URL } from '../../../constants/constants';
import ROUTES from './../../../constants/routes';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import userContext from '../../../context/userContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import FlashMessage from '../../layout/FlashMessage/FlashMessage';

const RegisterUser = (props) => {

  const history = useHistory();

  const { userData, setUserData } = useContext(userContext);

  const [state, setState] = useState({
    error: '',
    name: '',
    lastName: '',
    email: '',
    password: ''
  });

  const initialValues = {
    name: '',
    lastName: '',
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    name: Yup.string().min(2),
    lastName: Yup.string().min(2),
    email: Yup.string().required('Required').email('Invalid email format'),
    password: Yup.string().required('Required').min(5)
  });

  const onSubmit = (values, onSubmitProps) => {
    setState({
      'error': ''
    });
    if (values.name.length && values.lastName.length && values.email.length && values.password.length) {
      const payload = {
        "name": values.name,
        "lastName": values.lastName,
        "email": values.email,
        "password": values.password,
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
            history.push(ROUTES.MAIN);
          } else {
            console.error("Some error ocurred.");
          }
        })
        .catch(function (error) {
          console.error(new Error(error.message));
          setState({
            'error': "Connection Error Try Again Later"
          });
          if (error.response) {
            setState({
              'error': error.response.data
            });
          }
          onSubmitProps.setSubmitting(false);
        });
    } else {
      console.log('Please enter valid username and password');
    }
  };

  return (
    <div className="RegisterUser">
      <h1>Sign Up</h1>

      {(state.error !== "") ? <FlashMessage message={state.error} visible={true} /> : null}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {formik => {
          return (
            <Form>
              <div className="form-group">
                <Field type='text'
                  id='name'
                  name='name'
                  placeholder=' '
                  autoComplete="given-name"
                />
                <label htmlFor='name'>Name</label>
                <span className="form-error"><ErrorMessage name='name' /></span>
              </div>

              <div className="form-group">
                <Field type='text'
                  id='lastName'
                  name='lastName'
                  placeholder=' '
                  autoComplete="family-name"
                />
                <label htmlFor='lastName'>Last Name</label>
                <span className="form-error"><ErrorMessage name='lastName' /></span>
              </div>

              <div className="form-group">
                <Field type='email'
                  id='email'
                  name='email'
                  placeholder=' '
                  autoComplete="email"
                />
                <label htmlFor='email'>Email</label>
                <span className="form-error"><ErrorMessage name='email' /></span>
              </div>

              <div className="form-group">
                <Field type='password'
                  id='password'
                  name='password'
                  placeholder=' '
                  autoComplete="new-password"
                />
                <label htmlFor='password'>Password</label>
                <span className="form-error"><ErrorMessage name='password' /></span>
              </div>

              <button type="submit" disabled={!(formik.dirty && formik.isValid) || (formik.isSubmitting)}>Register</button>
            </Form>);
        }
        }
      </Formik>
    </div>
  )
}

export default RegisterUser;