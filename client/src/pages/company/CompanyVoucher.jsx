import React from 'react';
import { IoChevronBack } from 'react-icons/io5';
import codigoqrImg from '../../assets/kolibri.jpg';

export default function CompanyVoucher() {
  return (
    <div className="h-[100vh] pt-40 bg-bgGreen text-darkBlue">
      <div className="fixed top-0 w-full z-50 bg-darkBlue border-t border-gray-500 shadow-md rounded-b-[40px] px-5 pb-7 pt-10 flex justify-between items-center text-white">
        <div className="flex justify-between items-center w-full">
          <p className="text-2xl font-medium">Voucher</p>
          <span className="text-xl">
            <IoChevronBack />
          </span>
        </div>
      </div>

      <img src={codigoqrImg} className="max-h-40 mx-auto" />

      <form className="mt-14 px-7 flex flex-col gap-y-4">
        <div className="flex flex-col">
          <label htmlFor="" className="text-sm mb-2">
            Nombre del premio
          </label>
          <input type="text" placeholder="" className="p-2 rounded-[10px]" />
        </div>
        <div className="grid grid-cols-2 gap-x-5">
          <div className="flex flex-col">
            <label htmlFor="" className="text-sm mb-2">
              Fecha de inicio
            </label>
            <input type="text" placeholder="" className="p-2 rounded-[10px]" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="text-sm mb-2">
              Fecha de finalización
            </label>
            <input type="text" placeholder="" className="p-2 rounded-[10px]" />
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="text-sm mb-2">
            Cantidad de puntos asignados
          </label>
          <input type="text" placeholder="" className="p-2 rounded-[10px]" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="text-sm mb-2">
            Lugar de canjeo
          </label>
          <input type="text" placeholder="" className="p-2 rounded-[10px]" />
        </div>
      </form>
    </div>
  );
}
