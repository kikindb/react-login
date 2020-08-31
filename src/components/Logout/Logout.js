import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Logout = (props) => {
  const history = useHistory();

  useEffect(() => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    history.push('/');
  }, []);

  return (
    <div className="Logout">
    </div>
  );
}

export default Logout;