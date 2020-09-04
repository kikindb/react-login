import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './FacebookLogin.scss';
import axios from 'axios';
import { API_FULL_URL } from '../../../constants/constants';
import ROUTES from '../../../constants/routes';
import userContext from '../../../context/userContext';

const FacebookLogin = (props) => {

  const history = useHistory();

  const { userData, setUserData } = useContext(userContext);

  const [state, setState] = useState({
    error: ""
  });

  const facebookLogin = () => {
    if (!window.FB) return;
    window.FB.getLoginStatus(response => {
      if (response.status === "connected") {
        //read user data
        facebookLoginHandler(response);
      } else {
        window.FB.login(facebookLoginHandler, { scope: 'public_profile,email' });
      }
    });
  };

  const facebookLoginHandler = (response) => {
    console.log(response);
    if (response.status === "connected") {
      //read user data
      console.log("FB res:", response);

      window.FB.api('/me?fields=id,first_name,last_name,email,picture', userData => {
        console.log(userData);
        axios.post(API_FULL_URL + '/auth/facebook', userData, {
          headers: {
            'x-access-token': response.authResponse.accessToken
          }
        })
          .then(function (response) {
            if (response.status === 200) {
              localStorage.setItem('userToken', response.headers['x-auth-token']);
              setUserData({
                token: response.headers['x-auth-token'],
                user: response.data.user
              });
              history.push(ROUTES.MAIN);
            } else {
              console.error("Some error ocurred");
              setState({
                'error': "Some error ocurred"
              });
            }
          })
          .catch(function (error) {
            console.error(error);
            if (error.response && error.response.status === 400) {
              setState({
                'error': error.response.data
              });
            }
          });
      });

    }
  };
  return (
    <div className="FacebookLogin">
      <button className="facebook-btn" onClick={facebookLogin}>Continue with Facebook</button>
    </div>
  )
}

export default FacebookLogin
