import React, { useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';

import { RiAppleFill } from 'react-icons/ri';
import { AuthContext } from '../../context/AuthContext';

const getPasswordStrength = (value) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{7,}$/;

  if (passwordRegex.test(value)) {
    return 'Fuerte';
  } else if (value.length >= 7) {
    return 'Moderada';
  } else {
    return 'Débil';
  }
};

export default function Register() {
  const authContext = useContext(AuthContext);
  const { registerUsuario, registerEmpresa, isCompany } = authContext;
  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [rubroError, setRubroError] = useState('');
  const [addressError, setAddressError] = useState('');
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

    const strength = getPasswordStrength(password);
    setPasswordStrength(strength);

    if (!email && !password && !nombre && !nombreempresa && !rubro && !emailempresa && !direccion) {
      setEmailError('El campo de correo electrónico no puede estar vacío.');
      setNameError('El campo de nombre no puede estar vacío.');
      setRubroError('El campo de rubro no puede estar vacío.');
      setAddressError('El campo de dirección no puede estar vacío.');
      setPasswordError('El campo de contraseña no puede estar vacío.');
      setPasswordStrength('');
      return;
    } else if (!direccion) {
      setAddressError('El campo de nombre no puede estar vacío.');
      return;
    } else if (!emailempresa) {
      setEmailError('El campo de correo electrónico no puede estar vacío.');
      return;
    } else if (!rubro) {
      setRubroError('El campo de rubro no puede estar vacío.');
      return;
    } else if (!nombreempresa) {
      setNameError('El campo de nombre no puede estar vacío.');
      return;
    } else if (!nombre) {
      setNameError('El campo de nombre no puede estar vacío.');
      return;
    } else if (!email) {
      setEmailError('El campo de correo electrónico no puede estar vacío.');
      return;
    } else if (!password) {
      setPasswordError('El campo de contraseña no puede estar vacío.');
      return;
    } else if (!isValidEmail(email) || strength === 'Débil') {
      setEmailError('El correo electrónico no es válido. Inténtalo de nuevo.');
      setPasswordError(
        'La contraseña es débil. Debe contener al menos 7 caracteres, una letra mayúscula y un número. Inténtalo de nuevo.'
      );
      return;
    }

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

  const isValidEmail = (email) => {
    // Utiliza una expresión regular simple para validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = () => {
    const email = userRef.current?.email?.value;
    setEmailError(!isValidEmail(email) ? 'El correo electrónico no es válido. Inténtalo de nuevo.' : '');
  };

  // Función para manejar el cambio en el campo de contraseña
  const handlePasswordChange = () => {
    const password = userRef.current?.password?.value;
    setPasswordError(
      getPasswordStrength(password) === 'Débil'
        ? 'La contraseña es débil. Debe contener al menos 7 carácteres, una letra mayúscula y un número.'
        : ''
    );
    setPasswordStrength(getPasswordStrength(password));
  };

  return (
    <div className="flex flex-col gap-y-10 px-5 pb-14">
      <p className="flex flex-col">
        <span className="text-3xl font-bold text-center">Hola!</span>
        <span className="text-xl font-bold text-center">Regístrese para empezar</span>
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
          {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
          {/* Rubro */}
          {isCompany && (
            <div className="relative">
              <select
                id="customSelect"
                name="customSelect"
                className="border border-gray-400 p-2 rounded-lg w-full appearance-none"
              >
                <option value="">Rubro</option>
                <option value="Carton">Cartón</option>
                <option value="Plastico">Plástico</option>
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
          {rubroError && <p className="text-red-500 text-sm">{rubroError}</p>}
          {/* Email */}
          <input
            id="email"
            name="email"
            type="email"
            placeholder={isCompany ? 'Email de empresa' : 'Email'}
            className="border border-gray-400 p-2 rounded-lg"
            onChange={handleEmailChange}
          />
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          {/* direccion */}
          {isCompany && (
            <input
              id="address"
              name="address"
              type="text"
              placeholder="Dirección"
              className="border border-gray-400 p-2 rounded-lg"
            />
          )}
          {addressError && <p className="text-red-500 text-sm">{addressError}</p>}
          {/* Pass */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="Contraseña"
              className="border border-gray-400 p-2 rounded-lg w-full"
              onChange={handlePasswordChange}
            />
            <button type="button" className="absolute right-2 top-2 text-gray-500" onClick={toggleShowPassword}>
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
          {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}

          {passwordStrength && (
            <div>
              <p
                className={`text-${passwordStrength.toLowerCase()} text-sm font-semibold ${passwordStrength === 'Débil' ? 'text-[#ff5252]' : passwordStrength === 'Moderada' ? 'text-[#FFD740]' : 'text-[#4CAF50]'}`}
              >
                Fuerza de la contraseña: {passwordStrength}
              </p>
              <div className="w-full h-1 bg-red-200 mt-3">
                <div
                  className={`h-full ${passwordStrength === 'Débil' ? 'w-1/3 bg-[#ff5252]' : passwordStrength === 'Moderada' ? 'w-2/3 bg-[#FFD740]' : 'w-full bg-[#4CAF50]'}`}
                ></div>
              </div>
            </div>
          )}
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirmar contraseña"
            className="border border-gray-400 p-2 rounded-lg"
          />
        </div>

        <div className="flex flex-col gap-y-3">
          <button type="submit" className="bg-greenMain text-zinc-800 rounded-lg py-2 text-center text-lg font-bold">
            Registrarse
          </button>
          <span className="my-3">
            <hr />{' '}
            <span className="flex justify-center relative">
              <span className="absolute -top-3 bg-white px-5 text-gray-500 text-base">o Registrese con</span>
            </span>
          </span>
          <div className="flex justify-between gap-x-5">
            <Link to={'/#'} className="border-2 text-zinc-800 border-zinc-800 w-full py-2 rounded-xl flex justify-center text-xl">
              <FaGoogle />
            </Link>
            <Link to={'/#'} className="border-2 text-zinc-800 border-zinc-800 w-full py-2 rounded-xl flex justify-center text-xl">
              <FaFacebookF />
            </Link>
            <Link to={'/#'} className="border-2 text-zinc-800 border-zinc-800 w-full py-2 rounded-xl flex justify-center text-xl">
              <RiAppleFill />
            </Link>
          </div>

          <p className="text-xs text-center">
            Al continuar, usted acepta las Condiciones del servicio y la Política de privacidad de Nombre de la Ecovale
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
