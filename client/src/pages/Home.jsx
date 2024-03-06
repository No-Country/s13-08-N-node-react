import React, { useState } from 'react';
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
import chemical from '../assets/chemical.jpg';
import advance from '../assets/advance.jpg';
import carton from '../assets/home/carton.png';
import vidrio from '../assets/home/vidrio.png';
import plastico from '../assets/home/plastico.png';
import metal from '../assets/ticket/latas.jpeg';
import adan from '../assets/profile/adan.jpg';
import andreina from '../assets/profile/andreina.jpg';
import daisy from '../assets/profile/daisy.jpg';
import enrique from '../assets/profile/enrique.jpg';
import ezequiel from '../assets/profile/ezequiel.jpg';
import henry from '../assets/profile/henry.jpg';
import malvina from '../assets/profile/malvina.jpg';
import marcos from '../assets/profile/marcos.jpg';
import nazareno from '../assets/profile/nazareno.jpg';
import tomas from '../assets/profile/tomas.jpg';

import { TeamCard } from '../components/ui/Cards/TeamCard';
import { Footer } from '../components/Footer/Footer';
import SimpleDonut from '../components/Chart/SimpleDonut';
import Materials from '../components/Materials/Materials';
import Company from '../components/Company/Company';
import { Link } from 'react-router-dom';
export const Home = () => {
  const articles = [
    {
      title: 'Reciclaje: Cómo y por qué debemos hacerlo',
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
        'El reciclaje es una herramienta clave para promover un mundo más saludable y sostenible. Al adoptar prácticas de reciclaje en nuestra vida diaria, podemos marcar la diferencia en la preservación del medio ambiente y en la mejora de nuestra calidad de vida.',
      picture: claves,
    },
  ];

  const teamMembers = [
    {
      name: 'Adan Jimenez',
      rol: 'Front End',
      image: adan,
      socialLinks: [{ name: 'linkedin', link: 'https://www.linkedin.com/in/adan-jimenez-dev/' }],
    },
    {
      name: 'Andreina Godoy',
      rol: 'UX UI',
      image: andreina,
      socialLinks: [{ name: 'linkedin', link: 'https://www.linkedin.com/in/gvandre/' }],
    },
    {
      name: 'Daisy Castillo',
      rol: 'Back End',
      image: daisy,
      socialLinks: [{ name: 'linkedin', link: 'https://www.linkedin.com/in/daisycastillos/' }],
    },
    {
      name: 'Enrique M.',
      rol: 'Back End',
      image: enrique,
      socialLinks: [{ name: 'linkedin', link: 'https://www.linkedin.com/in/enrique-moreira-23189b216/' }],
    },
    {
      name: 'Ezequiel Berretta',
      rol: 'Front End',
      image: ezequiel,
      socialLinks: [{ name: 'linkedin', link: 'https://linkedin.com/in/ezequiel-berretta' }],
    },
    {
      name: 'Henry Ramirez',
      rol: 'Front End',
      image: henry,
      socialLinks: [{ name: 'linkedin', link: 'https://www.linkedin.com/in/henry-ramirez-417861259' }],
    },
    {
      name: 'Malvina Christiansen',
      rol: 'QA',
      image: malvina,
      socialLinks: [{ name: 'linkedin', link: 'https://www.linkedin.com/in/malvina-christiansen' }],
    },
    {
      name: 'Marcos Kruppa',
      rol: 'Front End',
      image: marcos,
      socialLinks: [{ name: 'linkedin', link: 'https://www.linkedin.com/in/kruppamarcos' }],
    },
    {
      name: 'Nazareno Susunday',
      rol: 'PM',
      image: nazareno,
      socialLinks: [{ name: 'linkedin', link: 'https://www.linkedin.com/in/nazareno-susunday-990243a1/' }],
    },
    {
      name: 'Tomas Lona',
      rol: 'Back End',
      image: tomas,
      socialLinks: [{ name: 'linkedin', link: 'https://www.linkedin.com/in/tomydeveloper' }],
    },
  ];

  const [showDetails, setShowDetails] = useState(Array(articles.length).fill(false));

  const handleLinkClick = (index) => {
    setShowDetails((prevShowDetails) => {
      const newShowDetails = [...prevShowDetails];
      newShowDetails[index] = !newShowDetails[index];
      return newShowDetails;
    });
  };
  const [mostrarMateriales, setMostrarMAteriales] = useState(false);
  const handleMostrarMateriales = () => {
    setMostrarMAteriales((prevMostrarMateriales) => !prevMostrarMateriales);
  };
  const [mostrarEquipo, setMostrarEquipo] = useState(false);
  const handleMostrarEquipo = () => {
    setMostrarEquipo((prevMostrarEquipo) => !prevMostrarEquipo);
  };
  const [mostrarEmpresas, setMostrarEmpresas] = useState(false);
  const handleMostrarEmpresas = () => {
    setMostrarEmpresas((prevMostrarEmpresas) => !prevMostrarEmpresas);
  };

  return (
    <>
      <div className="fixed top-0 w-full z-50 bg-[#062d46] text-[#feffff] shadow-md rounded-b-[40px] px-5 pb-5 pt-8 flex justify-between items-center">
        <p className="text-2xl font-bold text-center">Hola, Bienvenido</p>
        <Link to={'/auth'} className="text-greenMain border border-greenMain px-5 py-1 rounded-md font-bold">
          Login
        </Link>
      </div>
      <div className="px-5 pt-24 pb-10 flex flex-col gap-3 text-[#062D46]">
        <h2 className="text-xl font-bold mt-5">Hábitos Medioambientales</h2>
        <DetailCard title="El Progreso">
          <SimpleDonut />
        </DetailCard>
        <h2 className="text-xl font-bold my-3">Materiales a Reciclar</h2>
        <div className={`gap-5 ${mostrarMateriales ? 'grid grid-cols-2' : 'slider'}`}>
          <Materials picture={plastico} />
          <Materials picture={carton} />
          <Materials picture={vidrio} />
          <Materials picture={metal} />
        </div>
        <div className="flex justify-end">
          <span className="underline cursor-pointer" onClick={handleMostrarMateriales}></span>
        </div>
        <DetailCard
          title="¿Listo para reciclar?"
          description="Únete a Ecovale, aprende a reciclar y suma puntos en el proceso."
          image={reciclajeverde}
          linkText={<CardButton linkText="Empezemos" path="auth" />}
        />
        <h2 className="text-xl font-bold my-3">Artículos Publicados</h2>
        <div className="flex flex-col gap-3">
          {articles.map(({ title, description, picture }, i) => (
            <DetailCard
              key={i}
              title={title}
              description={description}
              image={picture}
              linkText={
                <div className="flex justify-end">
                  <span className="underline cursor-pointer" onClick={() => handleLinkClick(i)}>
                    Leer más
                  </span>
                </div>
              }
              showDetails={showDetails[i]} // Cambiado a un solo booleano
            />
          ))}
        </div>

        <h2 className="text-xl font-bold my-3">Empresas Colaboradoras</h2>
        <div className={`gap-5 w-full mx-auto ${mostrarEmpresas ? 'grid grid-cols-2' : 'slider'}`}>
          <Company picture={darsentido} />
          <Company picture={psa} />
          <Company picture={kolibri} />
          <Company picture={zafran} />
          <Company picture={chemical} />
          <Company picture={advance} />
        </div>
        <div className="flex justify-end">
          <span className="underline cursor-pointer" onClick={handleMostrarEmpresas}></span>
        </div>
        <p className="text-xl font-bold my-3">Nuestro Equipo</p>
        <div className={`${mostrarEquipo ? 'grid grid-cols-2' : 'slider'} gap-5 w-full mx-auto `}>
          {teamMembers.map((teamMember, i) => (
            <TeamCard key={i} {...teamMember} />
          ))}
        </div>
        <span className="underline text-right cursor-pointer" onClick={handleMostrarEquipo}></span>
      </div>
      <Footer />
    </>
  );
};
