/* eslint-disable react/prop-types */
import React from 'react';
import { avatars } from '../../assets/profile';
import { MenuHamburger } from '../ui/Buttons/MenuHamburger';

export const Navbar = ({ name }) => {
  const randomIndex = Math.floor(Math.random() * avatars.length);

  return (
    <div className=" text-white fixed top-0 w-full z-50 bg-darkBlue border-t border-gray-500 shadow-md rounded-b-[40px] px-5 pb-5 pt-8 flex justify-between items-center">
      <div className="flex items-center gap-x-2">
        <div className="w-12 h-12 flex justify-center items-center bg-slate-200 rounded-full">
          <img src={avatars[randomIndex]} alt="Profile" />
        </div>
        <p className="text-2xl font-semibold">Hola, {name}</p>
      </div>
      <MenuHamburger />
    </div>
  );
};
