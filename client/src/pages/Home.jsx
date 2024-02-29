import React from 'react';
import { MenuIcon } from '../assets';
import { DetailCard } from '../components/ui/Cards/DetailCard';
import { CardButton } from '../components/ui/Buttons/CardButton';
import picture from '../assets/picture.png';
import reciclajeverde from '../assets/reciclaje-verde.jpg';
import darsentido from '../assets/dar_sentido.jpg';
import psa from '../assets/psa.jpg';
import kolibri from '../assets/kolibri.jpg';
import zafran from '../assets/zafran.jpg';
import carton from '../assets/carton.jpg';
import vidrio from '../assets/vidrio.jpg';
import plastico from '../assets/plastico.jpg';
import metal from '../assets/metal.jpg';
import { TeamCard } from '../components/ui/Cards/TeamCard';
import { Footer } from '../components/Footer/Footer';
import SimpleDonut from '../components/Chart/SimpleDonut';
import Materials from '../components/Materials/Materials';
import Company from '../components/Company/Company';

export const Home = () => {
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

  const teamMembers = [
    {
      name: 'Bonnie Green',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: '',
      socialLinks: [
        { name: 'facebook', link: 'https://facebook.com/johndoe' },
        { name: 'twitter', link: 'https://twitter.com/johndoe' },
        { name: 'dribbble', link: 'https://facebook.com/johndoe' },
        { name: 'github', link: 'https://twitter.com/johndoe' },
      ],
    },
    {
      name: 'Bonnie Green',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: '',
      socialLinks: [
        { name: 'facebook', link: 'https://facebook.com/johndoe' },
        { name: 'twitter', link: 'https://twitter.com/johndoe' },
        { name: 'dribbble', link: 'https://facebook.com/johndoe' },
        { name: 'github', link: 'https://twitter.com/johndoe' },
      ],
    },
    {
      name: 'Bonnie Green',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: '',
      socialLinks: [
        { name: 'facebook', link: 'https://facebook.com/johndoe' },
        { name: 'twitter', link: 'https://twitter.com/johndoe' },
        { name: 'dribbble', link: 'https://facebook.com/johndoe' },
        { name: 'github', link: 'https://twitter.com/johndoe' },
      ],
    },
    {
      name: 'Bonnie Green',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: '',
      socialLinks: [
        { name: 'facebook', link: 'https://facebook.com/johndoe' },
        { name: 'twitter', link: 'https://twitter.com/johndoe' },
        { name: 'dribbble', link: 'https://facebook.com/johndoe' },
        { name: 'github', link: 'https://twitter.com/johndoe' },
      ],
    },
  ];

  return (
    <>
      <div className="fixed top-0 w-full z-50 bg-white border-t border-gray-500 shadow-md rounded-b-[40px] px-5 pb-5 pt-8 flex justify-between items-center">
        <p className="text-2xl font-semibold text-center">Hola, Bienvenido</p>
        <div>
          <MenuIcon />
        </div>
      </div>
      <div className="px-5 pt-24 pb-10 bg-gray-300 flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-center mt-5">Hábitos Medioambientales</h2>
        <DetailCard
          title="El progreso"
          description="Lorem Ipsumis simply dummy text of the printing and typesetting industry."
          linkText={<CardButton linkText="Ver más" />}
        >
          <SimpleDonut />
        </DetailCard>
        <h2 className="text-xl font-semibold text-center my-3">Materiales a Reciclar</h2>
        <div className="flex gap-5 slider">
          <Materials picture={carton} />
          <Materials picture={vidrio} />
          <Materials picture={plastico} />
          <Materials picture={metal} />
        </div>
        <div className="flex justify-end">
          <span className="underline">Ver más</span>
        </div>
        <DetailCard
          title="Listo para Reciclar?"
          description="Unete a Ecovale, aprende a reciclar y suma puntos en el proceso"
          image={reciclajeverde}
          linkText={<CardButton linkText="Empezemos" path="auth" />}
        />
        <h2 className="text-xl font-semibold text-center my-3">Articulos publicados</h2>
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
        <h2 className="text-xl font-semibold text-center my-3">Empresas colaboradoras</h2>
        <div className="gap-5 slider max-w-[768px] mx-auto">
          <Company picture={darsentido} />
          <Company picture={psa} />
          <Company picture={kolibri} />
          <Company picture={zafran} />
        </div>
        <div className="flex justify-end">
          <span className="underline">Ver más</span>
        </div>
        <p className="text-xl font-semibold text-center my-3">Nuestro Equipo</p>
        <div className="gap-5 slider max-w-[768px] mx-auto">
          {teamMembers.map((teamMember, i) => (
            <TeamCard key={i} {...teamMember} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};
