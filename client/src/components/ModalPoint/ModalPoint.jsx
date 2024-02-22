import React from 'react';

const ModalPoint = ({ ubicacionData, onClose }) => {
  return (
    <>
      <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
        <div className='bg-white p-8 max-w-md rounded-lg'>
          <button className='absolute top-4 right-4 text-gray-600 hover:text-gray-800' onClick={onClose}>
            &times;
          </button>
          <h2 className='text-2xl font-bold mb-4'>{ubicacionData.nombre}</h2>
          {ubicacionData.img && <img className='w-full mb-4' src={ubicacionData.img} alt={ubicacionData.nombre} />}
          <p><strong>Dirección:</strong> {ubicacionData.direccion}</p>
          <p><strong>Horario:</strong> {ubicacionData.horario}</p>
        </div>
      </div>
    </>
  );
};

export default ModalPoint;
