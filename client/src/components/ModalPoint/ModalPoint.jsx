import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const ModalPoint = ({ onClose }) => {
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [listedMaterials, setListedMaterials] = useState([]);
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://points-89az.onrender.com/materials');
        if (!response.ok) {
          throw new Error('Failed to fetch materials');
        }
        const data = await response.json();
        setListedMaterials(data);
      } catch (error) {
        console.error('Error fetching materials:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);

  const ubicacionData = {
    nombre: 'Filtrado de material',
    materiales: listedMaterials.map((material) => material.nombrematerial) || [],
  };

  const handleMaterialToggle = (material) => {
    const isSelected = selectedMaterials.includes(material);

    if (isSelected) {
      setSelectedMaterials((prevSelected) => prevSelected.filter((item) => item !== material));
    } else {
      setSelectedMaterials((prevSelected) => [...prevSelected, material]);
    }
  };

  const handleApplyClick = () => {
    const selectedMaterialIds = selectedMaterials.map((material) => {
      const foundMaterial = listedMaterials.find((item) => item.nombrematerial === material);
      return foundMaterial.nombrematerial;
    });

    onClose(selectedMaterialIds);
  };

  return (
    <div className=" flex items-center justify-center mr-[12.5vw]">
      <div className="bg-white  p-6 max-w-md rounded-lg relative flex flex-col" ref={modalRef}>
        <h2 className="text-2xl font-bold mb-4">{ubicacionData.nombre}</h2>
        <p></p>
        <div>
          {ubicacionData.materiales &&
            ubicacionData.materiales.sort().map((material) => (
              <div key={material} className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  id={material}
                  checked={selectedMaterials.includes(material)}
                  onChange={() => handleMaterialToggle(material)}
                  className={`  text-indigo-00 focus:ring-indigo-900 h-4 w-4 ${
                    selectedMaterials.includes(material) ? 'bg-green-500' : ''
                  }`}
                />
                <label htmlFor={material} className="font-bold text-darkBlue ">
                  {material.toUpperCase()}
                </label>
              </div>
            ))}
        </div>
        <button className="bg-[#36da9e] text-1xl font-bold py-2 rounded-lg" onClick={handleApplyClick}>
          APLICAR
        </button>
      </div>
    </div>
  );
};

ModalPoint.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalPoint;
