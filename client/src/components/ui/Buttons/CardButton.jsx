/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

export const CardButton = ({ linkText, path }) => {
  return (
    <button className="bg-[#36da9e] font-semibold py-2 rounded-lg">
      <Link to={path}>{linkText}</Link>
    </button>
  );
};
