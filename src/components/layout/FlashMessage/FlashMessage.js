import React from 'react';
import './FlashMessage.scss';

const FlashMessage = props => {
  const handleClick = e => {
    e.preventDefault();
    console.log(e);
  }

  if (props.message) {
    return (
      <div className="FlashMessage">
        {props.message}
        <button onClick={handleClick}>x</button>
      </div >
    );
  } else {
    return '';
  }
}

export default FlashMessage;
