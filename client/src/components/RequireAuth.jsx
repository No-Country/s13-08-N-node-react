/* eslint-disable react/prop-types */
import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';

const RequireAuth = ({ roles }) => {
  // const { auth } = useAuth();
  const location = useLocation();
  console.log(roles);

  const isAuthorized = roles.includes(2001);

  return isAuthorized ? <Outlet /> : <Navigate to="/auth" state={{ from: location }} replace />;
};

export default RequireAuth;
