import React from 'react';
import { Outlet } from 'react-router-dom';
import bgAuthImg from '../../assets/bgAuth.jpeg';
import logoImg from '../../assets/logo.svg';

export default function AuthLayout() {
  return (
    <div className="h-[100vh] bg-cover bg-center relative" style={{ backgroundImage: `url(${bgAuthImg})` }}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
      <img src={logoImg} className="mx-auto pt-10 z-50" />
      <div className="bg-white w-full fixed bottom-0 rounded-t-3xl">
        <div className="border-2 border-gray-200 w-36 mx-auto rounded-3xl mt-5 mb-10"></div>
        <Outlet />
      </div>
    </div>
  );
}
