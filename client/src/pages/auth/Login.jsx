import React, { useContext, useRef, useState } from 'react';
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

export default function Login() {
  const authContext = useContext(AuthContext);
  const { loginUsuario, loginEmpresa, isCompany } = authContext;
  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const userRef = useRef(null);

  // const handlePasswordChange = (e) => {
  //   const password = userRef.current?.password?.value;
  //   setPasswordStrength(getPasswordStrength(password));
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = userRef.current?.email?.value;
    const emailempresa = userRef.current?.email?.value;
    const password = userRef.current?.password?.value;

    const strength = getPasswordStrength(password);
    setPasswordStrength(strength);

    if (!email && !password) {
      setEmailError('El campo de correo electrónico no puede estar vacío.');
      setPasswordError('El campo de contraseña no puede estar vacío.');
      setPasswordStrength('');
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
        await loginEmpresa({ emailempresa, password });
      } else {
        await loginUsuario({ email, password });
      }
      userRef.current && userRef.current.reset();
    } catch (error) {
      console.log('Ocurrió un error al ingresar al sistema', error.message);
    }
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
      <p className="text-3xl font-bold text-center">Hola de nuevo!</p>
      <form ref={userRef} onSubmit={handleLogin} className="flex flex-col gap-y-10">
        <div className="flex flex-col gap-y-4">
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            className="border border-gray-400 p-2 rounded-lg"
            onChange={handleEmailChange}
          />
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            className="border border-gray-400 p-2 rounded-lg"
            onChange={handlePasswordChange}
          />
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

          <Link className="flex justify-center">Olvidaste tu contraseña?</Link>
        </div>

        <div className="flex flex-col gap-y-3">
          <button type="submit" className="bg-greenMain text-white rounded-lg py-2 text-center text-base block">
            Iniciar sesión
          </button>
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
          Regístrate ahora
        </Link>{' '}
      </p>
    </div>
  );
}
