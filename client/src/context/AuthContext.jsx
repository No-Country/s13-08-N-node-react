/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react"
export const AuthContext = createContext();


const AuthContextProvicer = ({ children }) => {
  const [userData, setUserData] = useState({ name: "", lastname: "" })
  const data = {
    userData,
    setUserData
  }

  return (

    <AuthContext.Provider value={data}>

      {children}

    </AuthContext.Provider>

  )
}