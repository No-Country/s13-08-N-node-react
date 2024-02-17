import React from 'react';
import { Route, Routes } from 'react-router-dom';
import App from '../App';
// import { FullWithLayout } from '../hocs/layouts/FullWithLayout';
import AuthLayout from '../hocs/layouts/AuthLayout';

import { Home } from '../pages/Home';
import { FullWithLayout } from '../hocs/layouts/FullWithLayout';
import Auth from '../pages/Auth';
import Login from '../pages/Login';
import Register from '../pages/Register';


export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<FullWithLayout />}>
        <Route index element={<Home />} />
        <Route path="/map" element={<App />} />
      </Route>
      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<Auth />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
};
