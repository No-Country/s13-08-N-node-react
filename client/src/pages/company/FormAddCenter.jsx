import React, { useState } from 'react';
import { MenuHamburger } from '../../components/ui/Buttons/MenuHamburger';
import { HiCamera } from 'react-icons/hi2';
import picture from '../../assets/center.png';

export const FormAddCenter = () => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const recyclingOptions = [
    { value: 'papel', label: 'Papel' },
    { value: 'plastico', label: 'Plástico' },
    { value: 'vidrio', label: 'Vidrio' },
    { value: 'metal', label: 'Metal' },
    { value: 'electronicos', label: 'Electrónicos' },
    { value: 'baterias', label: 'Baterías' },
    { value: 'aceite', label: 'Aceite de cocina' },
    { value: 'textiles', label: 'Ropa y textiles' },
  ];

  return (
    <div className="h-[100vh] my-40 bg-bgGreen text-darkBlue flex flex-col gap-y-3 mt-10">
      <div className="fixed top-0 w-full z-50 bg-darkBlue border-t border-gray-500 shadow-md rounded-b-[40px] px-5 pb-7 pt-10 flex justify-between items-center text-white">
        <div className="flex items-center justify-between w-full">
          <p className="font-bold">Centro de Reciclaje</p>
          <MenuHamburger />
        </div>
      </div>

      <div className="mt-20 mx-auto relative">
        <img src={picture} className="w-40" />
        <div className="absolute bg-darkBlue py-1 px-2 rounded-lg right-0 bottom-0">
          <HiCamera className="text-white" />
        </div>
      </div>

      <form className="mt-14 px-7 flex flex-col gap-y-4">
        <div className="flex flex-col">
          <label htmlFor="" className="text-sm mb-2">
            Nombre
          </label>
          <input type="text" placeholder="Nombre del Centro" className="p-2 rounded-[10px]" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="text-sm mb-2">
            Dirección
          </label>
          <input type="text" placeholder="Trujillo, Venezuela" className="p-2 rounded-[10px]" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="text-sm mb-2">
            Correo
          </label>
          <input type="text" placeholder="soy.gvandre@gmail.com" className="p-2 rounded-[10px]" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="text-sm mb-2">
            Teléfono
          </label>
          <input type="text" placeholder="(123) 456 789" className="p-2 rounded-[10px]" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="text-sm mb-2">
            Materiales que recibe
          </label>
          <select value={selectedValue} onChange={handleChange}>
            {recyclingOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};
