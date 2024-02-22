/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthLayout from '../hocs/layouts/AuthLayout';

import { Home } from '../pages/Home';
import { FullWithLayout } from '../hocs/layouts/FullWithLayout';
import Auth from '../pages/auth/Auth';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import DetailPoint from '../components/DetailPoint/DetailPoint';
import { UserHome } from '../pages/user/UserHome';
import { UserMap } from '../pages/user/UserMap';
import RequireAuth from '../components/RequireAuth';
import { CompanyHome } from '../pages/company/CompanyHome';
import { MainLayout } from '../hocs/layouts/MainLayout';

export const AppRouter = () => {
  const ROLES = {
    User: 2001,
    Company: 1984,
  };

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<FullWithLayout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<Auth />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* Protected routes */}
      <Route element={<RequireAuth roles={[ROLES.User]} />}>
        <Route element={<MainLayout />}>
          <Route path="/user" element={<UserHome />} />
          <Route path="/user/map" element={<UserMap />} />
          <Route path="/user/map/:id" element={<DetailPoint />} />
        </Route>
      </Route>
      <Route element={<RequireAuth roles={[ROLES.Company]} />}>
        <Route element={<MainLayout />}>
          <Route path="/company" element={<CompanyHome />} />
        </Route>
      </Route>
    </Routes>
  );
};
