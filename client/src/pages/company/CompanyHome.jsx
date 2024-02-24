import React from 'react';
import { Navbar } from '../../components/Navbar/Navbar';
import { BsTicketPerforated, BsBagDash, BsClockHistory } from 'react-icons/bs';
import { FaRegStar } from 'react-icons/fa';
import { RiLoopLeftLine } from 'react-icons/ri';
import { DetailCard } from '../../components/ui/Cards/DetailCard';
import SimpleDonut from '../../components/Chart/SimpleDonut';
import { CardButton } from '../../components/ui/Buttons/CardButton';
import picture from '../../assets/picture.png';
import { MdAddCircleOutline } from 'react-icons/md';
import { FiCompass } from 'react-icons/fi';

export const CompanyHome = () => {
  const details = [
    {
      icon: <BsTicketPerforated />,
      title: 'Vales otorgados',
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

  const status = ['122523', '122523'];
  return (
    <div>
      <Navbar name="Nombre empresa" />
      <div className="px-5 py-28 bg-gray-200 flex flex-col gap-3">
        <div className="bg-white w-full flex justify-between py-3 px-6 rounded-[10px]">
          {details.map(({ icon, title, quantity }, i) => (
            <div key={i} className="flex flex-col gap-1 items-center font-medium">
              <span className="text-2xl">{icon}</span>
              <h2 className="text-sm">{title}</h2>
              <p className="text-xl">{quantity}</p>
            </div>
          ))}
        </div>
        <p className="text-xl font-semibold">Estatus</p>
        <div className="w-full flex gap-x-2">
          {status.map((item, i) => (
            <div key={i} className="flex items-center bg-white w-1/2 p-3 rounded-[10px] gap-x-3">
              <span>
                <RiLoopLeftLine className="text-xl" />
              </span>
              <div className="flex flex-col">
                <p className="font-medium">Transacción</p>
                <span className="text-sm"># {item}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xl font-semibold">Estadísticas</p>
        <DetailCard
          title="El progreso"
          description="Lorem Ipsumis simply dummy text of the printing and typesetting industry."
          image={<SimpleDonut />}
          linkText={<CardButton linkText="Ver más" />}
        />
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Materiales aceptados</h2>
          <span className="bg-black py-1 px-3 text-white text-2xl rounded-xl">
            <MdAddCircleOutline />
          </span>
        </div>
        <div className="flex gap-5 slider">
          <div className="bg-white flex w-24 p-2 slide rounded-lg">
            <img src={picture} alt="Article Image" />
          </div>
          <div className="bg-white flex w-24 p-2 slide rounded-lg">
            <img src={picture} alt="Article Image" />
          </div>
          <div className="bg-white flex w-24 p-2 slide rounded-lg">
            <img src={picture} alt="Article Image" />
          </div>
          <div className="bg-white flex w-24 p-2 slide rounded-lg">
            <img src={picture} alt="Article Image" />
          </div>
        </div>
        <div className="flex justify-end">
          <span className="underline">Ver más</span>
        </div>
        <p className="text-xl font-semibold">Gestión</p>
        <div className="w-full flex gap-x-2 text-slate-500">
          <div className="flex items-center bg-white w-1/2 p-3 rounded-[10px] gap-x-3">
            <span>
              <FiCompass className="text-2xl" />
            </span>
            <p className="font-medium">Centros de Reciclaje</p>
          </div>
          <div className="flex items-center bg-white w-1/2 p-3 rounded-[10px] gap-x-3">
            <span>
              <BsClockHistory className="text-2xl" />
            </span>
            <p className="font-medium">Historial de Recolección</p>
          </div>
        </div>
      </div>
    </div>
  );
};
