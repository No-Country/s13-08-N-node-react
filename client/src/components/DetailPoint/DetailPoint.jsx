import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDataFronJson } from '../../helpers/fetchDataFromJson';
import { DetailMap } from '../DetailMap/DetailMap';
const DetailPoint = () => {
  const { id } = useParams();
  const [pointData, setPointData] = useState({});
  const [distancia, setDistancia] = useState(null);
  const initialPoint = { lat: '-34.582716', lng: '-58.426167' };

  useEffect(() => {
    const url = `https://points-89az.onrender.com/recycling-center/point/${id}`;
    fetchDataFronJson(url)
      .then((data) => {
        setPointData(data);

        setDistancia(calcularDistancia(initialPoint.lng, initialPoint.lat, data.latLng.lat, data.latLng.lng));
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        setPointData([]);
      });
  }, [id]);

  function calcularDistancia(lat1, lon1, lat2, lon2) {
    const radioTierra = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distancia = radioTierra * c;
    return distancia.toFixed(1);
  }

  return (
    <>
      <div className=" bg-bgGreen sm:flex sm:flex-col   mt-1 p-4  rounded-lg ">
        <div className="flex sm:align-middle sm:justify-center sm:gap-20   bg-darkBlue  text-white rounded-xl p-4 gap-6 justify-start items-center mt-4">
          <img src={pointData?.imagen} alt="Imagen" className="w-auto h-16 sm:h-24 rounded mr-2" />
          <div className="flex row gap-4">
            <div className="flex flex-col gap-1 ">
              <h2 className="text-4xl font-bold mb-2 ">{pointData?.nombre}</h2>
              <p className="text-bgGreen">📍 {pointData?.ubicacion}</p>
              <p className="text-bgGreen">🕒 {pointData?.horario_atencion}</p>
              <p className="text-bgGreen">
                🚶 <strong className="text-1xl">{distancia}</strong> km de tu ubicación
              </p>
              <div className="text-white mt-3 flex flex-row gap-3">
                {pointData?.materials?.length > 0
                  ? pointData?.materials?.map((material, index) => (
                      <p className="bg-[#36da9e] text-sm font-bold p-1 text-darkBlue rounded" key={index}>
                        {material.nombre.toUpperCase()}
                      </p>
                    ))
                  : 'No especificado'}
              </div>
            </div>
          </div>
        </div>
        <div></div>

        <div className="flex items-center mt-2">
          <p className="text-gray-600"></p>
        </div>
        <div className="mt-2    ">
          <DetailMap latLng={pointData.latLng} />
        </div>
      </div>
    </>
  );
};

export default DetailPoint;
