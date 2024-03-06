/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

export const DetailCard = ({ children, title, description, image, linkText, showDetails }) => {
  return (
    <div className="flex bg-white p-3 rounded-xl items-center gap-3 my-2 max-w-[768px] mx-auto">
      <div className="flex flex-col gap-2 flex-grow">
        <p className="text-xl font-bold">{title}</p>
        <p className={`text-sm font-normal mb-2 ${showDetails ? '' : 'line-clamp-2'}`}>{description}</p>
        {linkText}
      </div>

      {image && (
        <div className="flex-shrink-0">
          <img className="w-full  object-cover" src={image} alt="Article Image" />
        </div>
      )}

      {children}
    </div>
  );
};
DetailCard.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string,
  linkText: PropTypes.node,
  showDetails: PropTypes.bool.isRequired, // Cambiado a un solo booleano
};

DetailCard.defaultProps = {
  showDetails: false, // Valor por defecto para showDetails
};
