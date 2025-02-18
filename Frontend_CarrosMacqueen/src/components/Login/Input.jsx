import React from 'react';

const Input = ({ type, holder }) => {
  return (
    <input type={type} placeholder={holder} />
  );
};

export default Input;