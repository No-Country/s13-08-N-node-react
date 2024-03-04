import React from 'react';
import { FaCamera } from 'react-icons/fa';
import { MenuHamburger } from '../../components/ui/Buttons/MenuHamburger';

export default function UserConfigurationEdit() {
  return (
    <div className="h-[100vh] pt-40 bg-bgGreen text-darkBlue">
      <div className="fixed top-0 w-full z-50 bg-darkBlue border-t border-gray-500 shadow-md rounded-b-[40px] px-5 pb-7 pt-10 flex justify-between items-center text-white">
        <div className="w-full">
          <span className="text-2xl flex justify-end">
            <MenuHamburger />
          </span>
          <div className="relative bg-gray-100 w-[100px] h-[100px] rounded-full mx-auto">
            <img src="" alt="" className="" />
            <span className="absolute bottom-1 right-1 text-xl text-[#757171]">
              <FaCamera className="text-greenMain" />
            </span>
          </div>
        </div>
      </div>

      <form className="mt-20 px-7 flex flex-col gap-y-4">
        <div className="flex flex-col">
          <label className="text-sm mb-2">Nombre</label>
          <input type="text" placeholder="" className="p-2 rounded-[10px]" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm mb-2">Correo</label>
          <input type="text" placeholder="ejemplo@gmail.com" className="p-2 rounded-[10px]" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm mb-2">Dirección</label>
          <input type="text" placeholder="Av. ejemplo - Estado, País" className="p-2 rounded-[10px]" />
        </div>
        <div className="flex flex-col gap-y-2">
          <label className="text-sm">Contraseña</label>
          <input type="text" placeholder="Contraseña" className="p-2 rounded-[10px] mb-2" />
          <input type="text" placeholder="Confirmar contraseña" className="p-2 rounded-[10px]" />
        </div>
      </form>
    </div>
  );
}
