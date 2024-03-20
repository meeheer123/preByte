import React from 'react';

const Button = ({ onClick }) => {
  return (
    <button onClick={onClick} className="popup-button">
      Open Quiz
    </button>
  );
};

export default Button;
