import React from 'react';
import { Link } from 'react-router-dom';
import { DiscoveryIcon, HomeIcon, ProfileIcon, RecycleIcon, TicketIcon } from '../../assets';

export const Menu = () => {
  return (
    <>
      <div className="fixed bottom-0 w-full z-50 bg-white border-t border-gray-500 shadow-md rounded-t-[40px] py-3">
        <ul className="flex flex-row justify-around items-center p-2">
          <li>
            <Link to="/" className="text-gray-600 hover:text-gray-800 flex flex-col items-center">
              <HomeIcon />
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/puntos" className="text-gray-600 hover:text-gray-800 flex flex-col items-center">
              <TicketIcon />
              Puntos
            </Link>
          </li>
          <li className="relative">
            <div className="w-[75px] h-[75px] bg-slate-800 rounded-full flex justify-center items-center absolute -top-20 -left-7 border-[5px] border- border-white">
              <Link to="/#" className="">
                <RecycleIcon className="text-white" />
              </Link>
            </div>
          </li>
          <li>
            <Link to="/locacion" className="text-gray-600 hover:text-gray-800 flex flex-col items-center">
              <DiscoveryIcon />
              Locación
            </Link>
          </li>
          <li>
            <Link to="/profile" className="text-gray-600 hover:text-gray-800 flex flex-col items-center">
              <ProfileIcon />
              Perfil
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};