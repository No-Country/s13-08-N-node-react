import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import Cookies from 'universal-cookie';
import { FaqIcon, MenuIcon } from '../../../assets';
import { Link } from 'react-router-dom';
import { IoSettingsOutline } from 'react-icons/io5';
import { RiLogoutCircleRLine } from 'react-icons/ri';

export const MenuHamburger = () => {
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
    <div className="relative">
      <button>
        <MenuIcon onClick={handleChange} />
      </button>
      {openMenu && (
        <div className="absolute text-sm font-medium -left-[132px] bg-white text-black shadow-lg px-3 py-4 rounded-xl top-[60px]">
          <Link
            to={isCompany ? '/company/configuration' : '/user/configuration'}
            className="flex gap-x-2 mb-3 hover:bg-slate-100"
          >
            <IoSettingsOutline className="text-2xl" /> Configuración
          </Link>
          <button className="flex gap-x-2 mb-3 hover:bg-slate-100">
            <FaqIcon className="text-2xl" /> FAQ y soporte
          </button>
          <button className="flex gap-x-2 hover:bg-slate-100" onClick={handleLogout}>
            <RiLogoutCircleRLine className="text-2xl" /> Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
};
