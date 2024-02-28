import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from './useAuth';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const { registerUsuario, loginUsuario, logoutUsuario, registerEmpresa, loginEmpresa, logoutEmpresa } = useAuth();
  const [isCompany, setIsCompany] = useState(false);

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
