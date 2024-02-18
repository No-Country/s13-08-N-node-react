import { createContext, useState } from "react";

export const UserDataContext = createContext();

const UserDataContextProvider = ({ children }) => {
  const [userData, setUserData] = useState({ name: "", lastname: "" });

  const contextValue = {
    userData,
    setUserData,
  };

  return (
    <UserDataContext.Provider value={contextValue}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataContextProvider;
