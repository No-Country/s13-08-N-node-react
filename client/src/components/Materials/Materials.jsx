import React from 'react';
import PropTypes from 'prop-types';

const Materials = ({ picture }) => {
  return (
    <div className="bg-white flex w-24 p-2 slide rounded-lg">
      <img src={`/src/assets/${picture}`} alt="Article Image" />
    </div>
  );
};

Materials.propTypes = {
  picture: PropTypes.string.isRequired,
};

export default Materials;
