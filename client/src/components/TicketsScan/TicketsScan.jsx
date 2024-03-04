import React from 'react';
import Cookies from 'universal-cookie';
import edit from '../../assets/ticket/edit.svg';
import PropTypes from 'prop-types';

export const TicketsScan = ({ materials, setSubmited, setVerify }) => {
  const cookies = new Cookies();
  const email = cookies.get('email');

  function calcularPesoTotal(materials) {
    let pesoTotal = 0;
    for (let i = 0; i < materials.length; i++) {
      pesoTotal += materials[i].kilos;
    }
    return pesoTotal;
  }

  const peso = calcularPesoTotal(materials);

  const handleSubmit = (event) => {
    event.preventDefault();

    setSubmited(true);
  };

  return (
    <div className="w-full text-darkBlue p-2">
      <h2 className="text-4xl text-left font-bold ">Escaneando...</h2>
      <div className="w-10/12 bg-[#E5F1F1] p-2 mx-auto text-left my-6 rounded-xl">
        <p>Se entrega a:</p>
        <p className="text-2xl font-bold">{email}</p>
      </div>
      <div className="flex flex-col justify-between ">
        <p className="text-right text-[#697077] font-bold px-10">Cantidad</p>
        {materials.map((material, index) => (
          <div className="flex flex-row justify-between w-full px-10" key={index}>
            <p>{material.material}</p>
            <p>{material.kilos}Kg</p>
          </div>
        ))}
      </div>
      <div className=" p-4">
        <div className="flex flex-row justify-between px-6">
          <p className="text-[#697077] font-bold text-xl">Total de materiales</p>
          <p>{materials.length}</p>
        </div>
        <div className="flex flex-row justify-between px-6">
          <p className="text-[#697077] font-bold text-xl">Peso Total</p>
          <p>{peso}Kg</p>
        </div>
        <div className="flex flex-row justify-between px-6 mt-4">
          <p className="text-[#697077] font-bold text-3xl">Puntos otorgados</p>
          <p className="font-bold text-3xl text-[#36DA9E]">{peso * 10}</p>
        </div>
      </div>

      <div className="flex flex-row  justify-end gap-2 px-8 items-center ">
        <p className="text-[#697077] text-xl ">Editar</p>
        <button onClick={() => setVerify(true)}>
          <img src={edit} />
        </button>
      </div>

      <div className="flex justify-center">
        <button
          className="mt-4  bg-[#36DA9E] text-xl  text-darkBlue font-bold py-2 px-4 rounded-xl"
          onClick={handleSubmit}
        >
          Otorgar puntos
        </button>
      </div>
    </div>
  );
};

TicketsScan.propTypes = {
  materials: PropTypes.arrayOf(
    PropTypes.shape({
      material: PropTypes.string.isRequired,
      kilos: PropTypes.number.isRequired,
    })
  ).isRequired,
  setSubmited: PropTypes.func.isRequired,
  setVerify: PropTypes.func.isRequired,
};
