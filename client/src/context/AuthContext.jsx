import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from './useAuth';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const { login } = useAuth();
  // const [userData, setUserData] = useState({ name: '', lastname: '' });

  const contextValue = {
    login,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContextProvider;
