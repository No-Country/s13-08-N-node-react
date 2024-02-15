import React from 'react';
import { MenuIcon } from '../assets';
import { DetailCard } from '../components/ui/Cards/DetailCard';
import { CardButton } from '../components/ui/Buttons/CardButton';
import chart from '../assets/chart.png';
import picture from '../assets/picture.png';

export const Home = () => {
  return (
    <>
      <div className="fixed top-0 w-full z-50 bg-white border-t border-gray-500 shadow-md rounded-b-[40px] px-5 pb-5 pt-8 flex justify-between items-center">
        <p className="text-2xl font-semibold">Hola, Bienvenido</p>
        <div>
          <MenuIcon />
        </div>
      </div>
      <div className="px-5 pt-24 pb-10 bg-gray-300 flex flex-col gap-3">
        <h1 className="text-xl font-semibold">Hábitos medioambientales</h1>
        <DetailCard
          title="El progreso"
          description="Lorem Ipsumis simply dummy text of the printing and typesetting industry."
          image={<img src={chart} alt="Article Image" />}
          linkText={<CardButton linkText="Ver más" />}
        />
        <h2 className="text-xl font-semibold">Materiales a Reciclar</h2>
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
        <DetailCard
          title="Listo para Recilcar?"
          description="Lorem Ipsumis simply dummy text of the printing and typesetting industry."
          image={<img src={picture} alt="Article Image" />}
          linkText={<CardButton linkText="Empezemos" />}
        />
        <p className="text-xl font-semibold">Articulos publicados</p>
        <div className="flex flex-col gap-3">
          <DetailCard
            title="Articulo 1"
            description="Lorem Ipsumis simply dummy text of the printing and typesetting industry."
            image={<img src={picture} alt="Article Image" />}
            linkText={
              <div className="flex justify-end">
                <span className="underline">Leer más</span>
              </div>
            }
          />
          <DetailCard
            title="Articulo 2"
            description="Lorem Ipsumis simply dummy text of the printing and typesetting industry."
            image={<img src={picture} alt="Article Image" />}
            linkText={
              <div className="flex justify-end">
                <span>Leer más</span>
              </div>
            }
          />
        </div>
      </div>
    </>
  );
};
