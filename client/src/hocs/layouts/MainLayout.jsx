import React from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from '../../components/Menu/Menu';

export const MainLayout = () => {
  return (
    <div className="bg-gray-200">
      <Outlet />
      <Menu />
    </div>
  );
};
