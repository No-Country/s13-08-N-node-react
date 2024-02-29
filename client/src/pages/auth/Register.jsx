import React, { useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';

import { RiAppleFill } from 'react-icons/ri';
import { AuthContext } from '../../context/AuthContext';

export default function Register() {
  const authContext = useContext(AuthContext);
  const { registerUsuario, registerEmpresa, isCompany } = authContext;
  const userRef = useRef(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    const nombre = userRef.current?.name?.value;
    const nombreempresa = userRef.current?.name?.value;
    const rubro = userRef.current?.customSelect?.value;
    const email = userRef.current?.email?.value;
    const emailempresa = userRef.current?.email?.value;
    const direccion = userRef.current?.address?.value;
    const password = userRef.current?.password?.value;
    console.log(nombre, rubro);
    try {
      if (isCompany) {
        await registerEmpresa({ nombreempresa, rubro, emailempresa, direccion, password });
      } else {
        await registerUsuario({ nombre, email, password });
      }
      userRef.current && userRef.current.reset();
    } catch (error) {
      console.log('Ocurrió un error al ingresar al sistema', error.message);
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col gap-y-10 px-5 pb-14">
      <p className="flex flex-col">
        <span className="text-3xl font-bold text-center">Hola!</span>
        <span className="text-xl font-bold text-center">Registrese para empezar</span>
      </p>
      <form ref={userRef} onSubmit={handleRegister} className="flex flex-col gap-y-10">
        <div className="flex flex-col gap-y-4">
          {/* Nombre */}
          <input
            id="name"
            name="name"
            type="text"
            placeholder={isCompany ? 'Nombre de la Empresa' : 'Nombre'}
            className="border border-gray-400 p-2 rounded-lg"
          />
          {/* Rubro */}
          {isCompany && (
            <div className="relative">
              <select
                id="customSelect"
                name="customSelect"
                className="border border-gray-400 p-2 rounded-lg w-full appearance-none"
              >
                <option value="">Rubro</option>
                <option value="Carton">Carton</option>
                <option value="Plastico">Plastico</option>
                <option value="Vidrio">Vidrio</option>
                <option value="Metal">Metal</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.293 7.293a1 1 0 0 1 1.414 0L10 9.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
                  />
                </svg>
              </div>
            </div>
          )}
          {/* Email */}
          <input
            id="email"
            name="email"
            type="email"
            placeholder={isCompany ? 'Email de empresa' : 'Email'}
            className="border border-gray-400 p-2 rounded-lg"
          />
          {/* direccion */}
          {isCompany && (
            <input
              id="address"
              name="address"
              type="text"
              placeholder="Direccion"
              className="border border-gray-400 p-2 rounded-lg"
            />
          )}
          {/* Pass */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="Contraseña"
              className="border border-gray-400 p-2 rounded-lg w-full"
            />
            <button type="button" className="absolute right-2 top-2 text-gray-500" onClick={toggleShowPassword}>
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
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
