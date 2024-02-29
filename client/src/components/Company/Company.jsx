import React from 'react';
import PropTypes from 'prop-types';

const Company = ({ picture }) => {
  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  return (
    <div className="custom-border-radius w-24 h-24 bg-gray-500 slide overflow-hidden max-w-[768px] mx-auto">
      <img src={picture} alt="Article Image" style={imageStyle} />
    </div>
  );
};

Company.propTypes = {
  picture: PropTypes.string.isRequired,
};

export default Company;
