/* eslint-disable react/prop-types */
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'universal-cookie';

const RequireAuth = ({ roles, redirectTo }) => {
  const cookies = new Cookies();
  const token = cookies.get('token');
  const isAuthenticated = !!token;

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (roles && roles.length > 0) {
    const userRole = cookies.get('role') || 'user';
    if (!roles.includes(userRole)) {
      return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
};

export default RequireAuth;
