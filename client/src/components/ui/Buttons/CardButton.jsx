/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

export const CardButton = ({ linkText, path }) => {
  return (
    <button className="bg-black text-white py-2 rounded-lg w-[150px]">
      <Link to={path}>{linkText}</Link>
    </button>
  );
};
