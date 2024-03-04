import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from './useAuth';
import Cookies from 'universal-cookie';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const { registerUsuario, loginUsuario, logoutUsuario, registerEmpresa, loginEmpresa, logoutEmpresa } = useAuth();
  const [isCompany, setIsCompany] = useState(false);
  console.log(isCompany);

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get('token');
    const rol = cookies.get('rol');

    console.log('Token:', token);
    console.log('Rol:', rol);

    if (token && rol) {
      setIsCompany(false);
    } else if (token && !rol) {
      setIsCompany(true);
    } else {
      setIsCompany(false);
    }
  }, []);

  const contextValue = {
    registerUsuario,
    loginUsuario,
    logoutUsuario,
    registerEmpresa,
    loginEmpresa,
    logoutEmpresa,
    isCompany,
    setIsCompany,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContextProvider;
