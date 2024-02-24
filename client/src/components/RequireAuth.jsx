/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';

const RequireAuth = ({ roles }) => {
  // const { auth } = useAuth();
  const location = useLocation();
  // console.log(roles);

  // const isAuthorized = roles.includes(1984);
  const [isAuthorized, setAuthorized] = useState(true)

  return isAuthorized ? <Outlet /> : <Navigate to="/auth/login" state={{ from: location }} replace />;
};

export default RequireAuth;