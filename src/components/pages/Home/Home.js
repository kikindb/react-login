import React, { useEffect, useContext } from 'react';
import './Home.scss';
import API_BASE_URL from '../../../constants/constants';
import { useHistory } from 'react-router-dom';
import userContext from '../../../context/userContext';

import axios from 'axios';

const Home = (props) => {
  const history = useHistory();

  const { userData, setUserData } = useContext(userContext);


  useEffect(() => {
  }, []);

  if (userData.user) {
    return (
      <div className="Home" >
        Hi { userData.user.name + ' ' + userData.user.lastName} This is home.
      </div >
    )
  } else {
    return (

      < div > Not Allowed{ history.push('/login')}</div >
    );
  }
  ;
}

export default Home;