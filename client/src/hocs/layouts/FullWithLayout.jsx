import React from 'react';
import { Outlet } from 'react-router-dom';
// import { Menu } from '../../components/Menu/Menu';

export const FullWithLayout = () => {
  return (
    <div className="bg-[#F7FAFC]">
      <Outlet />
      {/* <Menu /> */}
    </div>
  );
};
