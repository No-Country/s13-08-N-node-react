import React, { useState } from 'react';
import { Navbar } from '../../components/Navbar/Navbar';
import { BsTicketPerforated, BsBagDash } from 'react-icons/bs';
import { FaRegStar } from 'react-icons/fa';
import articulos from '../../assets/home/articulos.png';
import claves from '../../assets/home/claves.png';
import consejos from '../../assets/home/consejos.png';
import { DetailCard } from '../../components/ui/Cards/DetailCard';
import SimpleDonut from '../../components/Chart/SimpleDonut';
import Cookies from 'universal-cookie';

export const UserHome = () => {
  const cookies = new Cookies();
  const usuarioNombre = cookies.get('name');

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
  const [showDetails, setShowDetails] = useState(Array(articles.length).fill(false));

  const handleLinkClick = (index) => {
    setShowDetails((prevShowDetails) => {
      const newShowDetails = [...prevShowDetails];
      newShowDetails[index] = !newShowDetails[index];
      return newShowDetails;
    });
  };

  return (
    <div>
      <Navbar name={usuarioNombre} />
      <div className="px-5 py-28 bg-bgGreen flex flex-col gap-3 mt-6">
        <div className="bg-white w-full flex justify-between py-3 px-6 rounded-[10px]">
          {details.map(({ icon, title, quantity }, i) => (
            <div key={i} className="flex flex-col gap-1 items-center font-medium">
              <span className="text-2xl text-[#19CFD2]">{icon}</span>
              <h2 className="text-sm">{title}</h2>
              <p className="text-xl">{quantity}</p>
            </div>
          ))}
        </div>
        <p className="text-2xl font-bold text-darkBlue">Hábitos medioambientales</p>
        <DetailCard title="Cómo Has Estado Reciclando">
          <SimpleDonut />
        </DetailCard>
        <p className="text-2xl font-bold text-darkBlue">Artículos recientes</p>
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
      </div>
    </div>
  );
};
