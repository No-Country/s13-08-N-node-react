import React from 'react';
import { Link } from 'react-router-dom';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';

import { RiAppleFill } from 'react-icons/ri';

export default function Login() {
  return (
    <div className="flex flex-col gap-y-10 px-5 pb-14">
      <p className="text-3xl font-bold text-center">Hola de nuevo!</p>

      <form className="flex flex-col gap-y-10">
        <div className="flex flex-col gap-y-4">
          <input type="text" placeholder="Email" className="border border-gray-400 p-2 rounded-lg" />
          <input type="password" placeholder="Password" className="border border-gray-400 p-2 rounded-lg" />

          <Link className="flex justify-center">Olvidaste tu constraseña?</Link>
        </div>

        <div className="flex flex-col gap-y-3">
          <Link to="/#" className="bg-greenMain text-white rounded-lg py-2 text-center text-base block">
            Iniciar sesión
          </Link>
          <div className="flex justify-between gap-x-5">
            <Link to={'/#'} className="border border-black w-full py-2 rounded-xl flex justify-center text-xl">
              <FaGoogle />
            </Link>
            <Link to={'/#'} className="border border-black w-full py-2 rounded-xl flex justify-center text-xl">
              <FaFacebookF />
            </Link>
            <Link to={'/#'} className="border border-black w-full py-2 rounded-xl flex justify-center text-xl">
              <RiAppleFill />
            </Link>
          </div>
        </div>
      </form>

      <p className="text-center font-light">
        No tienes cuenta?{' '}
        <Link to="/auth/register" className="text-sm text-darkMain font-bold">
          Registrate ahora
        </Link>{' '}
      </p>
    </div>
  );
}