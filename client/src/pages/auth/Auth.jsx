import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { IoBusinessOutline } from 'react-icons/io5';
import { LuUser2 } from 'react-icons/lu';
import { AuthContext } from '../../context/AuthContext';

export default function Auth() {
  const authContext = useContext(AuthContext);
  const { isCompany, setIsCompany } = authContext;
  console.log(isCompany);

  const handleUser = () => {
    setIsCompany(false);
  };

  const handleCompany = () => {
    setIsCompany(true);
  };

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-4 px-5">
        <Link to="/auth/login" className="bg-greenMain text-zinc-800 rounded-lg py-2 text-center text-lg font-bold">
          Inicio de sesión
        </Link>
        <Link
          to="/auth/register"
          className="text-zinc-800 font-bold rounded-lg py-2 text-center text-lg border-2 border-zinc-800"
        >
          Registro
        </Link>
      </div>

      <span className="px-5">
        <hr />{' '}
        <span className="flex justify-center relative">
          <span className="absolute -top-3 bg-white px-5 text-gray-500 text-base">O</span>
        </span>
      </span>

      <p className="text-center">
        No tienes cuenta?{' '}
        <Link to="/auth/register" className="text-sm text-darkMain font-bold">
        Regístrate ahora
        </Link>{' '}
      </p>

      <div className="flex justify-between flex-grow">
        <button
          onClick={handleUser}
          className={`${isCompany ? '' : 'bg-green-100 font-extrabold text-lg transition-all duration-500'} w-full text-darkMain text-xs py-2 rounded-xl flex flex-col items-center`}
        >
          <span className={`${isCompany ? '' : 'font-bold text-lg transition-all duration-500'} w-full text-darkMain flex flex-col items-center`}>
            <LuUser2 />
          </span>
          Usuario
        </button>
        <button
          onClick={handleCompany}
          className={`${isCompany ? 'bg-green-100 font-extrabold text-lg transition-all duration-500' : ''}  w-full text-darkMain text-xs py-2 rounded-xl flex flex-col items-center`}
        >
          <span className={`${isCompany ? 'font-bold text-lg transition-all duration-500' : ''} w-full text-darkMain flex flex-col items-center`}>
            <IoBusinessOutline />
          </span>
          Empresa
        </button>
      </div>
    </div>
  );
}
