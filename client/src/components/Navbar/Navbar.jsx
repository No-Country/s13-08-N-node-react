/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import { FaqIcon, MenuIcon, ProfileIcon } from '../../assets';
import { IoSettingsOutline } from 'react-icons/io5';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import Cookies from 'universal-cookie';
import { AuthContext } from '../../context/AuthContext';

export const Navbar = ({ name, image }) => {
  const authContext = useContext(AuthContext);
  const { logoutUsuario, logoutEmpresa, isCompany } = authContext;
  const [openMenu, setOpenMenu] = useState(false);
  const cookies = new Cookies();
  const token = cookies.get('token');

  const handleChange = () => {
    setOpenMenu(!openMenu);
  };

  const handleLogout = async () => {
    try {
      if (isCompany) {
        await logoutEmpresa({ token });
      } else {
        await logoutUsuario({ token });
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div className=" text-white fixed top-0 w-full z-50 bg-darkBlue border-t border-gray-500 shadow-md rounded-b-[40px] px-5 pb-5 pt-8 flex justify-between items-center">
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
          <div className="absolute text-sm font-medium -left-[132px] bg-white text-black shadow-lg px-3 py-4 rounded-xl top-[60px]">
            <button className="flex gap-x-2 mb-3 hover:bg-slate-100">
              <IoSettingsOutline className="text-2xl" /> Configuración
            </button>
            <button className="flex gap-x-2 mb-3 hover:bg-slate-100">
              <FaqIcon className="text-2xl" /> FAQ y soporte
            </button>
            <button className="flex gap-x-2 hover:bg-slate-100" onClick={handleLogout}>
              <RiLogoutCircleRLine className="text-2xl" /> Cerrar Sesión
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
