import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegImage } from 'react-icons/fa6';
import kolibriImg from '../../assets/kolibri.jpg';
import { BsTicketPerforated } from 'react-icons/bs';
import center from '../../assets/center.png';
import { MenuHamburger } from '../../components/ui/Buttons/MenuHamburger';
import Cookies from 'universal-cookie';
import { Navbar } from '../../components/Navbar/Navbar';

export const CompanyCenter = () => {
  const cookies = new Cookies();
  const nombreEmpresa = cookies.get('nameCompany');

  const [switchVales, setSwitchVales] = useState(true);

  return (
    <div className=" h-full pt-36 bg-bgGreen text-darkBlue flex flex-col gap-y-3 mt-10">
      <Navbar name={nombreEmpresa} />
      <p className="font-semibold mx-5 text-lg">Centros de Reciclaje</p>
      <div className="mx-5 flex flex-col gap-5">
        <div className="flex gap-4 w-full slider">
          <Link
            to="/company/center/form-add-center"
            className="bg-white w-[95px] h-[129px] rounded-xl p-4 flex flex-col items-center justify-between text-center  font-semibold"
          >
            <div className="text-darkBlue bg-greenMain w-[43px] h-[43px] text-xl flex justify-center items-center rounded-full">
              +
            </div>
            <div className="flex flex-col">
              <span>Agregar</span>
              <span>Centro</span>
            </div>
          </Link>
          <div className="bg-white w-[95px] h-[129px] rounded-xl p-4 flex flex-col items-center justify-between text-center  font-semibold">
            <img src={center} alt="" />
            <div className="flex flex-col">
              <span>Centro</span>
              <span>1</span>
            </div>
          </div>
          <div className="bg-white w-[95px] h-[129px] rounded-xl p-4 flex flex-col items-center justify-between text-center  font-semibold">
            <img src={center} alt="" />
            <div className="flex flex-col">
              <span>Centro</span>
              <span>2</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[10px] pb-3">
          <div className="flex justify-between">
            <button
              onClick={() => setSwitchVales(true)}
              className={`${switchVales ? 'bg-white-300' : 'bg-green-100'} w-full py-4 text-center rounded-tl-[10px] flex flex-col items-center font-semibold`}
            >
              <span>1200</span> Puntos Otorgados
            </button>
            <button
              onClick={() => setSwitchVales(false)}
              className={`${switchVales ? 'bg-green-100' : 'bg-white'}  w-full py-4 text-center rounded-tr-[10px] flex flex-col items-center font-semibold`}
            >
              <span className="text-2xl text-darkBlue font-bold">
                <FaRegImage />
              </span>
              Vales
            </button>
          </div>
          {switchVales ? (
            <>
              <div className="px-3">
                <div className="flex justify-between items-center border-b border-gray-300 py-2">
                  <p className="text-base flex items-center gap-x-1">
                    <span className="text-xl">
                      <BsTicketPerforated />
                    </span>
                    200 Ecovales
                  </p>
                  <p className="text-sm font-normal">
                    Ref: #121543 <span className="ml-4">Fecha: 25/06/2024</span>
                  </p>
                </div>
              </div>
              <div className="px-3">
                <div className="flex justify-between items-center border-b border-gray-300 py-2">
                  <p className="text-base flex items-center gap-x-1">
                    <span className="text-xl">
                      <BsTicketPerforated />
                    </span>
                    200 Ecovales
                  </p>
                  <p className="text-sm font-normal">
                    Ref: #121543 <span className="ml-4">Fecha: 25/06/2024</span>
                  </p>
                </div>
              </div>
              <div className="px-3">
                <div className="flex justify-between items-center border-b border-gray-300 py-2">
                  <p className="text-base flex items-center gap-x-1">
                    <span className="text-xl">
                      <BsTicketPerforated />
                    </span>
                    200 Ecovales
                  </p>
                  <p className="text-sm font-normal">
                    Ref: #121543 <span className="ml-4">Fecha: 25/06/2024</span>
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-x-3 p-2 border-b border-gray-300">
                <img src={kolibriImg} alt="" className="max-h-10" />
                <div className="w-full">
                  <p className="text-base font-medium">Nombre del premio</p>
                  <div className="flex justify-between text-sm font-normal">
                    <p>Ref: #121543</p>
                    <p>Fecha: 25/06/2024</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-x-3 p-2 border-b border-gray-300">
                <img src={kolibriImg} alt="" className="max-h-10" />
                <div className="w-full">
                  <p className="text-base font-medium">Nombre del premio</p>
                  <div className="flex justify-between text-sm font-normal">
                    <p>Ref: #121543</p>
                    <p>Fecha: 25/06/2024</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
