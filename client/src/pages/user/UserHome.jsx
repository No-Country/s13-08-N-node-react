import React from 'react';
import { Navbar } from '../../components/Navbar/Navbar';
import { BsTicketPerforated, BsBagDash } from 'react-icons/bs';
import { FaRegStar } from 'react-icons/fa';
import picture from '../../assets/picture.png';
import { DetailCard } from '../../components/ui/Cards/DetailCard';
import SimpleDonut from '../../components/Chart/SimpleDonut';
import { CardButton } from '../../components/ui/Buttons/CardButton';

export const UserHome = () => {
  const articles = [
    {
      title: 'Articulo 1',
      description: 'Lorem Ipsumis simply dummy text of the printing and typesetting industry.',
    },
    {
      title: 'Articulo 2',
      description: 'Lorem Ipsumis simply dummy text of the printing and typesetting industry.',
    },
    {
      title: 'Articulo 3',
      description: 'Lorem Ipsumis simply dummy text of the printing and typesetting industry.',
    },
  ];

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

  return (
    <div>
      <Navbar name="Usuario" />
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
        <p className="text-xl font-bold">Hábitos medioambientales</p>

        <DetailCard
          title="El progreso"
          description="Lorem Ipsumis simply dummy text of the printing and typesetting industry."
          linkText={<CardButton linkText="Ver más" />}
        >
          <SimpleDonut />
        </DetailCard>
        <p className="text-xl font-bold">Artículos recientes</p>
        <div className="flex flex-col gap-3">
          {articles.map(({ title, description }, i) => (
            <DetailCard
              key={i}
              title={title}
              description={description}
              image={picture}
              linkText={
                <div className="flex justify-end">
                  <span className="underline">Leer más</span>
                </div>
              }
            />
          ))}
          <div className="flex justify-end">
            <span className="underline">Ver más</span>
          </div>
        </div>
      </div>
    </div>
  );
};
