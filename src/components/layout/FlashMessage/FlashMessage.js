import React, { useState, useEffect } from 'react';
import './FlashMessage.scss';

const FlashMessage = props => {

  const [flashData, setFlashData] = useState({
    message: props.message,
    visible: props.visible,
  });

  useEffect(() => {
    setTimeout(function () {
      //document.querySelector('.FlashMessage').setAttribute('style', 'display:block;');
      console.log("disapear");
    }, 1000);
  }, []);

  const handleClick = e => {
    e.preventDefault();
    setFlashData({
      message: "",
      visible: false
    });
  }

  if (flashData.message && flashData.visible) {
    return (
      <div className="FlashMessage">
        <div className="message">
          <h2>Uh Oh, Something went wrong</h2>
          <p>{props.message}</p>
        </div>
        <button onClick={handleClick} aria-label="Close error message alert">&times;</button>
      </div >
    );
  } else {
    return '';
  }
}

export default FlashMessage;
