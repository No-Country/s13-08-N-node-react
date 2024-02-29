/* eslint-disable react/prop-types */
import React from 'react';

export const DetailCard = ({ children, title, description, image, linkText }) => {
  return (
    <div className="flex bg-white p-3 rounded-xl items-center gap-3 my-3 max-w-[768px] mx-auto">
      <div className="flex flex-col gap-2 flex-grow">
        <p className="text-xl font-semibold">{title}</p>
        <p className="text-sm font-normal mb-2 line-clamp-2">{description}</p>
        {linkText}
      </div>

      {image && (
        <div className="flex-shrink-0">
          <img className="w-full h-full object-cover" src={image} alt="Article Image" />
        </div>
      )}

      {children}
    </div>
  );
};
