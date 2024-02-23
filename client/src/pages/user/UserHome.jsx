import React from 'react';
import { Link } from 'react-router-dom';

export const UserHome = () => {
  return (
    <div>
      UserHome
      <Link to="/map">
        <button>Map</button>
      </Link>
    </div>
  );
};
