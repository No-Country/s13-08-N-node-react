import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ModalPoint = ({ onClose }) => {
  const [selectedMaterials, setSelectedMaterials] = useState([]);

  const ubicacionData = {
    nombre: 'Ubicación de Prueba',
    materiales: ['plastico', 'papel/carton', 'vidrio', 'metales', 'pilas/baterias'],
  };

  const handleMaterialToggle = (material) => {
    const isSelected = selectedMaterials.includes(material);

    if (isSelected) {
      setSelectedMaterials((prevSelected) => prevSelected.filter((item) => item !== material));
    } else {
      setSelectedMaterials((prevSelected) => [...prevSelected, material]);
    }
  };

  // Evitar que el modal se cierre cuando se hace clic dentro del contenido
  const handleModalClick = (event) => {
    event.stopPropagation(); // Evitar la propagación del clic al contenedor principal
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
      <div className="bg-white p-8 max-w-md rounded-lg relative flex flex-col" onClick={handleModalClick}>
        <h2 className="text-2xl font-bold mb-4">{ubicacionData.nombre}</h2>
        <p>
          <strong>Materiales Reciclables:</strong>
        </p>
        <div>
          {ubicacionData.materiales &&
            ubicacionData.materiales.sort().map((material) => (
              <div key={material} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={material}
                  checked={selectedMaterials.includes(material)}
                  onChange={() => handleMaterialToggle(material)}
                  className={`mr-2 text-indigo-600 focus:ring-indigo-500 h-4 w-4 ${selectedMaterials.includes(material) ? 'bg-green-500' : ''}`}
                />
                <label htmlFor={material} className="text-gray-700">
                  {material}
                </label>
              </div>
            ))}
        </div>
        <button className="bg-black text-white center py-1 rounded-md"> + Aplicar</button>
      </div>
    </div>
  );
};
ModalPoint.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalPoint;
