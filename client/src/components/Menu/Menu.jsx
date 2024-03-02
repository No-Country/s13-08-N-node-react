import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, NotificationIcon, ProfileIcon, RecycleIcon, TicketIcon } from '../../assets';
import { AuthContext } from '../../context/AuthContext';

export const Menu = () => {
  const authContext = useContext(AuthContext);
  const { isCompany } = authContext;

  return (
    <>
      <div className="fixed bottom-0 w-full z-[1000] bg-white border-t border-gray-500 shadow-md rounded-t-[40px] py-3">
        <ul className="flex flex-row justify-around items-center p-2">
          <li>
            <Link
              to={isCompany ? '/' : '/user'}
              className="text-gray-600 hover:text-gray-800 flex flex-col items-center"
            >
              <HomeIcon />
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/user/vales" className="text-gray-600 hover:text-gray-800 flex flex-col items-center">
              <TicketIcon />
              Vales
            </Link>
          </li>
          <li className="relative">
            <div className="w-[75px] h-[75px] bg-slate-800 rounded-full flex justify-center items-center absolute -top-20 -left-7 border-[5px] border- border-white">
              <Link to={isCompany ? '/' : '/user/map'} className="">
                <RecycleIcon className="text-white" />
              </Link>
            </div>
          </li>
          <li>
            <Link to="/locacion" className="text-gray-600 hover:text-gray-800 flex flex-col items-center">
              <NotificationIcon />
              Notificación
            </Link>
          </li>
          <li>
            <Link to="/user/perfil" className="text-gray-600 hover:text-gray-800 flex flex-col items-center">
              <ProfileIcon />
              Perfil
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};
