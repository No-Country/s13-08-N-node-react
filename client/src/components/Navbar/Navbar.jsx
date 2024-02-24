/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { MenuIcon, ProfileIcon } from '../../assets';
import { IoSettingsOutline } from 'react-icons/io5';

export const Navbar = ({ name, image }) => {
  const [openMenu, setOpenMenu] = useState(false);

  const handleChange = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <div className="fixed top-0 w-full z-50 bg-white border-t border-gray-500 shadow-md rounded-b-[40px] px-5 pb-5 pt-8 flex justify-between items-center">
      <div className="flex items-center gap-x-2">
        <div className="w-12 h-12 flex justify-center items-center bg-slate-200 rounded-full">
          {image ? <img src={image} alt="Profile" /> : <ProfileIcon />}
        </div>
        <p className="text-2xl font-semibold">Hola, {name}</p>
      </div>
      <div className="relative">
        <button>
          <MenuIcon onClick={handleChange} />
        </button>
        {openMenu && (
          <button className="absolute text-sm font-medium flex gap-x-2 -left-[122px] top-[60px] bg-white shadow-lg px-3 py-4 rounded-xl">
            <IoSettingsOutline className="text- text-2xl" /> Configuración
          </button>
        )}
      </div>
    </div>
  );
};
