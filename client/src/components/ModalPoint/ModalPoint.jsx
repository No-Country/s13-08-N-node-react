import React from 'react'

const ModalPoint = ({ubicacionData, onClose}) => {
  return (
    <>
    <div className='modal'>
        <div className='modal-contenido'>
            <span className='close' onClick={onClose}>
                $times;
            </span>
            <h2>{ubicacionData.nombre}</h2>
            {ubicacionData.img && <img src='{ubicacionData.img}' alt={ubicacionData.nombre} />}
            <p>Direccion: {ubicacionData}</p>
            <p>Horario: {ubicacionData}</p>

        </div>
    </div>
    </>
  );
};

export default ModalPoint