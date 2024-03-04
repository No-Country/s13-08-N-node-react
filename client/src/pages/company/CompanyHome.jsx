import React from 'react';
import { Navbar } from '../../components/Navbar/Navbar';
import { BsTicketPerforated, BsBagDash, BsClockHistory } from 'react-icons/bs';
import { FaRegStar } from 'react-icons/fa';
import { RiLoopLeftLine } from 'react-icons/ri';
import { DetailCard } from '../../components/ui/Cards/DetailCard';
import SimpleDonut from '../../components/Chart/SimpleDonut';
import { CardButton } from '../../components/ui/Buttons/CardButton';
import carton from '../../assets/home/carton.png';
import vidrio from '../../assets/home/vidrio.png';
import plastico from '../../assets/home/plastico.png';
import metal from '../../assets/metal.jpg';
import { MdAddCircleOutline } from 'react-icons/md';
import { FiCompass } from 'react-icons/fi';
import Materials from '../../components/Materials/Materials';
import Cookies from 'universal-cookie';

export const CompanyHome = () => {
  const cookies = new Cookies();
  const nombreEmpresa = cookies.get('nameCompany');

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
      <Navbar name={nombreEmpresa} />
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
        <p className="text-2xl text-darkBlue font-bold">Estatus</p>
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
        <p className="text-2xl text-darkBlue font-bold">Estadísticas</p>
        <DetailCard
          title="Estadísticas de Recolección"
          description="Lorem Ipsumis simply dummy text of the printing and typesetting industry."
          linkText={<CardButton linkText="Ver más" />}
        >
          <SimpleDonut />
        </DetailCard>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl text-darkBlue font-bold">Materiales aceptados</h2>
          <span className="bg-darkBlue py-1 px-3 text-white text-2xl rounded-xl">
            <MdAddCircleOutline style={{ backgroundColor: '#062D46', color: 'white' }} />
          </span>
        </div>

        <div className="flex gap-5 slider">
          <Materials picture={plastico} />
          <Materials picture={carton} />
          <Materials picture={vidrio} />
          <Materials picture={metal} />
        </div>
        <div className="flex justify-end">
          <span className="underline">ver más</span>
        </div>
        <p className="text-2xl text-darkBlue font-bold">Gestión</p>
        <div className="w-full flex gap-x-2 text-darkBlue">
          <div className="flex items-center bg-white w-1/2 p-3 rounded-[10px] gap-x-3">
            <span>
              <FiCompass className="text-6xl" />
            </span>
            <p className="font-medium">Centros de Reciclaje</p>
          </div>
          <div className="flex items-center bg-white w-1/2 p-3 rounded-[10px] gap-x-3">
            <span>
              <BsClockHistory className="text-6xl" />
            </span>
            <p className="font-medium">Historial de Recolección</p>
          </div>
        </div>
      </div>
    </div>
  );
};
