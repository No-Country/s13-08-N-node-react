import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const UserDataContext = createContext();

const UserDataContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({ name: '', lastname: '' });

  const contextValue = {
    userData,
    setUserData,
  };

  return <UserDataContext.Provider value={contextValue}>{children}</UserDataContext.Provider>;
};

UserDataContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserDataContextProvider;
