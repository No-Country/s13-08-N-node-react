import React from 'react';
import PropTypes from 'prop-types';

const Materials = ({ picture }) => {
  return (
    <div className="flex bg-white p-2 rounded-lg items-center gap-3  max-w-[768px] mx-auto">
      <img className="min-w-[150px]" src={`/src/assets/${picture}`} alt="Article Image" />
    </div>
  );
};

Materials.propTypes = {
  picture: PropTypes.string.isRequired,
};

export default Materials;
