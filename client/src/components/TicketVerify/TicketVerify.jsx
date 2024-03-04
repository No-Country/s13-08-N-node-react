import React, { useState, useEffect } from 'react';
import { MdAddCircleOutline } from 'react-icons/md';
import PropTypes from 'prop-types';
import more from '../../assets/ticket/more.svg';
import less from '../../assets/ticket/less.svg';

export const TicketVerify = ({ setVerify, setMaterialsVerified, materialsVerified }) => {
  const [materials, setMaterials] = useState([]);
  const [totalKilos, setTotalKilos] = useState(0);

  useEffect(() => {
    if (materialsVerified.length > 0) {
      setMaterials(materialsVerified);
      // Calcular el peso total de los materiales preestablecidos
      const total = materialsVerified.reduce((acc, cur) => acc + cur.kilos, 0);
      setTotalKilos(total);
    }
  }, [materialsVerified]);

  const addMaterial = () => {
    setMaterials([...materials, { material: '', kilos: 0 }]);
  };

  const handleMaterialChange = (index, event) => {
    const newMaterials = [...materials];
    newMaterials[index].material = event.target.value;
    setMaterials(newMaterials);
  };

  const handleKilosChange = (index, amount) => {
    const newMaterials = [...materials];
    newMaterials[index].kilos += amount;
    setMaterials(newMaterials);
    setTotalKilos(totalKilos + amount);
  };

  const handleVerify = () => {
    setMaterialsVerified(materials);
    setVerify(false);
  };

  return (
    <div className="p-4 w-full pb-32">
      <div className="flex flex-row justify-end items-center gap-2">
        <p className="text-[#697077]">Agregar nuevo</p>
        <button className="bg-darkBlue  text-white font-bold py-1.5 px-4 rounded-xl" onClick={addMaterial}>
          <MdAddCircleOutline style={{ backgroundColor: '#062D46', color: 'white' }} />
        </button>
      </div>
      {materials.map((material, index) => (
        <div key={index} className=" mt-4 flex flex-row justify-around">
          <select
            className="inline shadow-md  text-[#697077] bg-[#F2F4F8] rounded h-14"
            value={material.material}
            onChange={(e) => handleMaterialChange(index, e)}
          >
            <option value="">Selecciona un material</option>
            <option value="carton">Cartón</option>
            <option value="aluminio">Aluminio</option>
            <option value="papel">Papel</option>
            <option value="pilas">Pilas</option>
            <option value="vidrio">Vidrio</option>
            <option value="plastico">Plástico</option>
            <option value="cobre">Cobre</option>
          </select>
          <div className="mt-2 justify-center flex flex-row items-center align-middle content-center  text-[#697077] bg-[#F2F4F8]  rounded-xl shadow-md px-4">
            <button onClick={() => handleKilosChange(index, 1)}>
              <img src={more} className="w-8" alt="Add more" />
            </button>
            <span className="mx-2">{material.kilos} kg</span>
            <button onClick={() => handleKilosChange(index, -1)}>
              <img src={less} className="w-8" alt="Add more" />
            </button>
          </div>
        </div>
      ))}
      <div className="mt-4 ">
        <div className=" text-[#697077] flex flex-row w-full  justify-between px-10">
          <p>Total de Materiales</p>
          <p>{materials.length}</p>
        </div>
        <div className=" text-[#697077] flex flex-row w-full justify-between px-10">
          <p>Peso total</p>
          <p> {totalKilos} Kg</p>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="mt-4  bg-[#36DA9E] text-xl  text-darkBlue font-bold py-2 px-4 rounded-xl"
          onClick={handleVerify}
        >
          Verificación
        </button>
      </div>
    </div>
  );
};

TicketVerify.propTypes = {
  setVerify: PropTypes.func.isRequired,
  setMaterialsVerified: PropTypes.func.isRequired,
  materialsVerified: PropTypes.array.isRequired,
};
