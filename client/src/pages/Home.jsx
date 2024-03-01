import React from 'react';
import { MenuIcon } from '../assets';
import { DetailCard } from '../components/ui/Cards/DetailCard';
import { CardButton } from '../components/ui/Buttons/CardButton';
import reciclajeverde from '../assets/home/Empezemos.png';
import articulos from '../assets/home/articulos.png';
import claves from '../assets/home/claves.png';
import consejos from '../assets/home/consejos.png';
import darsentido from '../assets/dar_sentido.jpg';
import psa from '../assets/psa.jpg';
import kolibri from '../assets/kolibri.jpg';
import zafran from '../assets/zafran.jpg';
import carton from '../assets/home/carton.png';
import vidrio from '../assets/home/vidrio.png';
import plastico from '../assets/home/plastico.png';
import metal from '../assets/metal.jpg';
import { TeamCard } from '../components/ui/Cards/TeamCard';
import { Footer } from '../components/Footer/Footer';
import SimpleDonut from '../components/Chart/SimpleDonut';
import Materials from '../components/Materials/Materials';
import Company from '../components/Company/Company';

export const Home = () => {
  const articles = [
    {
      title: 'Reciclaje: Cómo y  por qué debemos hacerlo',
      description:
        'El reciclaje es una actividad fundamental para preservar nuestro medio ambiente y construir un futuro sostenible. A través de simples acciones cotidianas, podemos contribuir de manera significativa a la reducción de la contaminación y al cuidado de nuestros recursos naturales. A continuación, te presentamos algunos consejos prácticos sobre cómo y por qué debemos reciclar.',
      picture: articulos,
    },
    {
      title: 'Reciclar en casa: Consejos prácticos',
      description:
        'El reciclaje es una actividad fundamental para preservar nuestro medio ambiente y construir un futuro sostenible. A través de simples acciones cotidianas, podemos contribuir de manera significativa a la reducción de la contaminación y al cuidado de nuestros recursos naturales. A continuación, te presentamos algunos consejos prácticos sobre cómo y por qué debemos reciclar.',
      picture: consejos,
    },
    {
      title: 'Reciclaje: Claves para un mundo más saludable',
      description:
        'El reciclaje es una herramienta clave para promover un mundo más saludable y sostenible. Al adoptar prácticas de reciclaje en nuestra vida diaria, podemos marcar la diferencia en la preservación del medio ambiente y en la mejora de nuestra calidad de vida. A',
      picture: claves,
    },
  ];

  const teamMembers = [
    {
      name: 'Nazareno S.',
      rol: 'PM',
      image: '',
      socialLinks: [{ name: 'linkedin', link: 'https://www.linkedin.com/in/nazareno-susunday-990243a1/' }],
    },
    {
      name: 'Andreina G.',
      rol: 'UX UI',
      image: '',
      socialLinks: [{ name: 'linkedin', link: 'https://www.linkedin.com/in/gvandre/' }],
    },
    {
      name: 'Malvina C.',
      rol: 'QA',
      image: '',
      socialLinks: [{ name: 'linkedin', link: 'https://www.linkedin.com/in/malvina-christiansen' }],
    },
    {
      name: 'Marcos K.',
      rol: 'Front End',
      image: '',
      socialLinks: [{ name: 'linkedin', link: 'https://www.linkedin.com/in/kruppamarcos' }],
    },
    {
      name: 'Adan J.',
      rol: 'Front End',
      image: '',
      socialLinks: [{ name: 'linkedin', link: 'https://www.linkedin.com/in/adan-jimenez-dev/' }],
    },
    {
      name: 'Henry R.',
      rol: 'Front End',
      image: '',
      socialLinks: [{ name: 'linkedin', link: 'https://www.linkedin.com/in/henry-ramirez-417861259' }],
    },
    {
      name: 'Ezequiel B.',
      rol: 'Front End',
      image: '',
      socialLinks: [{ name: 'linkedin', link: 'https://linkedin.com/in/ezequiel-berretta' }],
    },
    {
      name: 'Daisy C.',
      rol: 'Back End',
      image: '',
      socialLinks: [{ name: 'linkedin', link: 'https://www.linkedin.com/in/daisycastillos/' }],
    },
    {
      name: 'Tomas A.',
      rol: 'Back End',
      image: '',
      socialLinks: [{ name: 'linkedin', link: 'https://www.linkedin.com/in/tomydeveloper' }],
    },
    {
      name: 'Enrique M.',
      rol: 'Back End',
      image: '',
      socialLinks: [{ name: 'linkedin', link: 'https://www.linkedin.com/in/enrique-moreira-23189b216/' }],
    },
  ];

  return (
    <>
      <div className="fixed top-0 w-full z-50 bg-[#062d46] text-[#feffff] shadow-md rounded-b-[40px] px-5 pb-5 pt-8 flex justify-between items-center">
        <p className="text-2xl font-bold text-center">Hola, Bienvenido</p>
        <div>
          <MenuIcon className="text-[#feffff]" />
        </div>
      </div>
      <div className="px-5 pt-24 pb-10 flex flex-col gap-3 text-[#062D46]">
        <h2 className="text-xl font-bold mt-5">Hábitos Medioambientales</h2>
        <DetailCard
          title="El progreso"
          description="Lorem Ipsumis simply dummy text of the printing and typesetting industry."
          linkText={<CardButton linkText="Ver más" />}
        >
          <SimpleDonut />
        </DetailCard>
        <h2 className="text-xl font-bold my-3">Materiales a Reciclar</h2>
        <div className="flex gap-5 slider">
          <Materials picture={plastico} />
          <Materials picture={carton} />
          <Materials picture={vidrio} />
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
        <h2 className="text-xl font-bold my-3">Articulos publicados</h2>
        <div className="flex flex-col gap-3">
          {articles.map(({ title, description, picture }, i) => (
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

        <h2 className="text-xl font-bold my-3">Empresas colaboradoras</h2>
        <div className="gap-5 slider max-w-[768px] mx-auto">
          <Company picture={darsentido} />
          <Company picture={psa} />
          <Company picture={kolibri} />
          <Company picture={zafran} />
        </div>
        <div className="flex justify-end">
          <span className="underline">Ver más</span>
        </div>
        <p className="text-xl font-bold my-3">Nuestro Equipo</p>
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
