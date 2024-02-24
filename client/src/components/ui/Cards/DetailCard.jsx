/* eslint-disable react/prop-types */
import React from 'react';

export const DetailCard = ({ title, description, image, linkText }) => {
  return (
    <div className="flex bg-white p-3 rounded-lg gap-3">
      <div className="flex flex-col gap-2">
        <p className="text-xl font-semibold">{title}</p>
        <p className="text-sm font-normal mb-2 line-clamp-2">{description}</p>
        {linkText}
      </div>
      <div className="w-[200px] h-full flex items-center">
        <img src={`/src/assets/${image}`} alt="Article Image" />
      </div>
    </div>
  );
};
