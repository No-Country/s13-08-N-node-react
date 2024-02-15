import React from 'react';
import { Route, Routes } from 'react-router-dom';

// import { FullWithLayout } from '../hocs/layouts/FullWithLayout';
// import AuthLayout from '../hocs/layouts/AuthLayout';

import { Home } from '../pages/Home';
import { FullWithLayout } from '../hocs/layouts/FullWithLayout';
// import Login from '../pages/Login';
// import Register from '../pages/Register';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<FullWithLayout />}>
        <Route index element={<Home />} />
      </Route>
      {/* <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route> */}
    </Routes>
  );
};
