import React, { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';

import { RiAppleFill } from 'react-icons/ri';
import { AuthContext } from '../../context/AuthContext';

export default function Register() {
  const authContext = useContext(AuthContext);
  const { register } = authContext;
  const userRef = useRef(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = userRef.current?.name?.value;
    const email = userRef.current?.email?.value;
    const password = userRef.current?.password?.value;
    try {
      await register({ name, email, password });
      userRef.current && userRef.current.reset();
    } catch (error) {
      console.log('Ocurrió un error al ingresar al sistema', error.message);
    }
  };

  return (
    <div className="flex flex-col gap-y-10 px-5 pb-14">
      <p className="flex flex-col">
        <span className="text-3xl font-bold text-center">Hola!</span>
        <span className="text-xl font-bold text-center">Registrese para empezar</span>
      </p>

      <form ref={userRef} onSubmit={handleRegister} className="flex flex-col gap-y-10">
        <div className="flex flex-col gap-y-4">
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Nombre"
            className="border border-gray-400 p-2 rounded-lg"
          />
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            className="border border-gray-400 p-2 rounded-lg"
          />
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Contraseña"
            className="border border-gray-400 p-2 rounded-lg"
          />
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirmar contraseña"
            className="border border-gray-400 p-2 rounded-lg"
          />
        </div>

        <div className="flex flex-col gap-y-3">
          <button type="submit" className="bg-greenMain text-white rounded-lg py-2 text-center text-base block">
            Registrarse
          </button>
          <span className="my-3">
            <hr />{' '}
            <span className="flex justify-center relative">
              <span className="absolute -top-3 bg-white px-5 text-gray-500 text-base">o registre con</span>
            </span>
          </span>
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

          <p className="text-xs text-center">
            Al continuar, usted acepta las Condiciones del servicio y la Política de privacidad de Nombre de la App
          </p>
        </div>
      </form>

      <p className="text-center font-light">
        Ya tienes cuenta?{' '}
        <Link to="/auth/login" className="text-sm text-darkMain font-bold">
          Inicie sesión ahora
        </Link>{' '}
      </p>
    </div>
  );
}
