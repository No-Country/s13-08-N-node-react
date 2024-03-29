import React from 'react';
import bgAuthImg from '../assets/bgAuth.jpeg';
import { Navbar } from '../components/Navbar/Navbar';
import Cookies from 'universal-cookie';
export const UnderConstruction = () => {
  const cookies = new Cookies();
  const nombreEmpresa = cookies.get('nameCompany');

  return (
    <>
      <Navbar name={nombreEmpresa} />
      <div className="h-[100vh] bg-cover bg-center relative" style={{ backgroundImage: `url(${bgAuthImg})` }}>
        <div className="flex justify-center items-center h-full">
          <span className=" bg-darkBlue p-6 text-white font-bold text-2xl border-4 rounded-xl border-bgGreen">
            {' '}
            🏗️ EN DESARROLLO
          </span>
        </div>
      </div>
    </>
  );
};
