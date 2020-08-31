import React, { useState, useEffect } from 'react';
import userContext from './context/userContext';
import Header from './components/layout/Header/Header';
import Login from './components/pages/Login/Login';
import Home from './components/pages/Home/Home';
import RegisterUser from './components/pages/RegisterUser/RegisterUser';

import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import axios from 'axios';
import API_BASE_URL from './constants/constants'

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token;

      try {
        token = localStorage.getItem('userToken');
      } catch (e) { console.error(e); }

      if (token === null) {
        localStorage.setItem('userToken', '');
        token = '';
      } else if (token !== '') {
        const tokenRes = await axios.get(API_BASE_URL + '/api/users/me', {
          headers: {
            'x-auth-token': token
          }
        });

        if (tokenRes.data) {
          setUserData({
            token,
            user: tokenRes.data
          })
        }
      }
    }

    checkLoggedIn();
  }, []);

  return (
    <>
      <Router>
        <userContext.Provider value={{ userData, setUserData }}>
          <div className="App">
            <Header />
            <Switch>
              <Route path='/login' exact={true}>
                <Login />
              </Route>
              <Route path='/' exact={true}>
                <Home />
              </Route>
              <Route path='/register' exact={true}>
                <RegisterUser />
              </Route>
            </Switch>
          </div>
        </userContext.Provider>
      </Router>
    </>
  );
}

export default App;
