import React from 'react';
import { Link } from 'react-router-dom';
import analiticaImg from '../../assets/analitica.svg';
import { BsTicketPerforated, BsBagDash } from 'react-icons/bs';
import { FaRegStar } from 'react-icons/fa';
import entradasImg from '../../assets/entradas.svg';
import SimpleDonut from '../../components/Chart/SimpleDonut';
import { DetailCard } from '../../components/ui/Cards/DetailCard';
import { Navbar } from '../../components/Navbar/Navbar';

export const CompanyProfile = () => {
  const details = [
    {
      icon: <BsTicketPerforated />,
      title: 'Vales',
      quantity: '7000',
    },
    {
      icon: <BsBagDash />,
      title: 'Articulo 2',
      quantity: '7000Kg',
    },
    {
      icon: <FaRegStar />,
      title: 'Articulo 3',
      quantity: '4.8',
    },
  ];
  return (
    <div>
      <Navbar name="Nombre empresa" />
      <div className="px-5 py-28 bg-bgGreen flex flex-col gap-3">
        <div className="bg-white w-full flex justify-between py-3 px-6 rounded-[10px]">
          {details.map(({ icon, title, quantity }, i) => (
            <div key={i} className="flex flex-col gap-1 items-center font-medium">
              <span className="text-2xl text-[#19CFD2]">{icon}</span>
              <h2 className="text-sm">{title}</h2>
              <p className="text-xl">{quantity}</p>
            </div>
          ))}
        </div>
        <div className="bg-white w-full rounded-[10px] px-2 py-3">
          <Link to="/company/voucher">
            <img src={entradasImg} alt="" className="mx-auto mb-2 h-[60px]" />
            <p className="text-base text-center font-semibold">Vourchers a canjear</p>
          </Link>
        </div>
        <DetailCard
          title="Estadísticas"
          description="Lorem Ipsumis simply dummy text of the printing and typesetting industry."
        >
          <SimpleDonut />
        </DetailCard>

        <div className="bg-white p-4 rounded-[10px]">
          <p className="text-xl font-bold mb-2">Canjes en Febrero</p>
          <div className="flex justify-between">
            <div className="text-sm flex flex-col gap-y-2">
              <p>Valores en relación al mes anterior </p>
              <div className="flex justify-between">
                <p>Vauches</p>
                <div className="w-24 h-3 bg-bgGreen rounded-2xl">
                  <div className="bg-red-400 w-14 h-3 rounded-2xl"></div>
                </div>
              </div>
              <div className="flex justify-between">
                <p>Vales</p>
                <div className="w-24 h-3 bg-bgGreen rounded-2xl">
                  <div className="bg-greenMain w-20 h-3 rounded-2xl"></div>
                </div>
              </div>
              <div className="flex justify-between">
                <p>Reciclaje</p>
                <div className="w-24 h-3 bg-bgGreen rounded-2xl">
                  <div className="bg-darkBlue w-10 h-3 rounded-2xl"></div>
                </div>
              </div>
            </div>
            <img src={analiticaImg} alt="" />
          </div>
          <p className="text-center mt-5 text-xl font-[350]">Estás haciendo una gran labor!</p>
        </div>
      </div>
    </div>
  );
};
