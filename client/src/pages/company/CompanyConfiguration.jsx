import React, { useContext } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineSecurity, MdOutlinePolicy } from 'react-icons/md';
import { RiCustomerService2Fill } from 'react-icons/ri';
import { BiLogOutCircle } from 'react-icons/bi';
import { IoChevronBack } from 'react-icons/io5';
import Cookies from 'universal-cookie';
import { AuthContext } from '../../context/AuthContext';

export const CompanyConfiguration = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { logoutEmpresa } = authContext;
  const cookies = new Cookies();
  const token = cookies.get('token');

  const handleLogout = async () => {
    try {
      await logoutEmpresa({ token });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="h-[100vh] pt-40 bg-bgGreen text-darkBlue">
      <div className="fixed top-0 w-full z-50 bg-darkBlue border-t border-gray-500 shadow-md rounded-b-[40px] px-5 pb-7 pt-10 flex justify-between items-center text-white">
        <div className="flex justify-between items-center w-full">
          <p className="text-2xl font-medium">Configuración</p>
          <span onClick={handleBack} className="text-xl">
            <IoChevronBack />
          </span>
        </div>
      </div>

      <div className="flex flex-col px-5 gap-y-3">
        <Link to={'edit'} className="bg-white p-4 rounded-xl flex items-center gap-x-2">
          <span>
            <CgProfile />
          </span>
          Editar perfil
        </Link>
        <Link className="bg-white p-4 rounded-xl flex items-center gap-x-2">
          <span>
            <MdOutlineSecurity />
          </span>
          Seguridad
        </Link>
        <Link className="bg-white p-4 rounded-xl flex items-center gap-x-2">
          <span>
            <MdOutlinePolicy />
          </span>
          Términos y Políticas
        </Link>
        <Link className="bg-white p-4 rounded-xl flex items-center gap-x-2">
          <span>
            <RiCustomerService2Fill />
          </span>
          FAQ y soporte
        </Link>
        <button onClick={handleLogout} className="bg-white p-4 rounded-xl flex items-center gap-x-2">
          <span>
            <BiLogOutCircle />
          </span>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};
