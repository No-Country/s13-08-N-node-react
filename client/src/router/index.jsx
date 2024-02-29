import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import AuthLayout from '../hocs/layouts/AuthLayout';

import { Home } from '../pages/Home';
import { FullWithLayout } from '../hocs/layouts/FullWithLayout';
import Auth from '../pages/auth/Auth';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import DetailPoint from '../components/DetailPoint/DetailPoint';
import Profile from '../pages/profile/Profile';
import ProfileEdit from '../pages/profile/ProfileEdit';
import { UserHome } from '../pages/user/UserHome';
import { UserMap } from '../pages/user/UserMap';
import RequireAuth from '../components/RequireAuth';
import { CompanyHome } from '../pages/company/CompanyHome';
import { MainLayout } from '../hocs/layouts/MainLayout';
import UserVoucher from '../pages/user/UserVoucher';
import Cookies from 'universal-cookie';

export const AppRouter = () => {
  const cookies = new Cookies();

  const userRole = cookies.get('role') || 'user';
  const isUser = userRole === 'user';
  const isAdmin = userRole === 'admin';

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
      <Route
        element={
          <RequireAuth redirectTo="/auth">
            {isUser && <Navigate to="/user" replace />}
            {isAdmin && <Navigate to="/company" replace />}
          </RequireAuth>
        }
      >
        <Route element={<MainLayout />}>
          <Route path="/user" element={<UserHome />} />
          <Route path="/user/map" element={<UserMap />} />
          <Route path="/user/map/:id" element={<DetailPoint />} />
          <Route path="/company" element={<CompanyHome />} />
          <Route path="/company/profile" element={<Profile />} />
          <Route path="/company/profile/edit" element={<ProfileEdit />} />
          <Route path="/company/profile/voucher" element={<UserVoucher />} />
        </Route>
      </Route>
    </Routes>
  );
};
