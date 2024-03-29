import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
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
import Cookies from 'universal-cookie';
import UserVoucher from '../pages/user/UserVoucher';
import UserConfigurationEdit from '../pages/user/UserConfigurationEdit';
import UserConfiguration from '../pages/user/UserConfiguration';
import UserPerfilPage from '../pages/user/UserPerfilPage';
import UserCodigoCanje from '../pages/user/UserCodigoCanje';
import { UnderConstruction } from '../pages/UnderConstruction';
import CompanyVoucher from '../pages/company/CompanyVoucher';
import { ScanPage } from '../pages/company/ScanPage';
import { FormTicket } from '../pages/company/FormTicket';
import { CompanyProfile } from '../pages/company/CompanyProfile';
import { CompanyConfiguration } from '../pages/company/CompanyConfiguration';
import { CompanyConfigurationEdit } from '../pages/company/CompanyConfigurationEdit';
import { CompanyCenter } from '../pages/company/CompanyCenter';
import { FormAddCenter } from '../pages/company/FormAddCenter';

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
          <Route path="/user/vales" element={<UserVoucher />} />
          <Route path="/user/codigo-canje" element={<UserCodigoCanje />} />
          <Route path="/user/perfil" element={<UserPerfilPage />} />
          <Route path="/user/configuration" element={<UserConfiguration />} />
          <Route path="/user/configuration/edit" element={<UserConfigurationEdit />} />
          <Route path="/notification" element={<UnderConstruction />} />

          <Route path="/company" element={<CompanyHome />} />
          <Route path="/company/center" element={<CompanyCenter />} />
          <Route path="/company/center/form-add-center" element={<FormAddCenter />} />
          <Route path="/company/profile" element={<CompanyProfile />} />
          <Route path="/company/voucher" element={<CompanyVoucher />} />
          <Route path="/company/configuration" element={<CompanyConfiguration />} />
          <Route path="/company/configuration/edit" element={<CompanyConfigurationEdit />} />
          <Route path="/company/scan-qr" element={<ScanPage />} />
          <Route path="/company/scan-qr/form-ticket" element={<FormTicket />} />
        </Route>
      </Route>
    </Routes>
  );
};
