import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDataFronJson } from '../../helpers/fetchDataFromJson';
import { DetailMap } from '../DetailMap/DetailMap';

const DetailPoint = () => {
  const { id } = useParams();
  const [pointData, setPointData] = useState({});

  useEffect(() => {
    const url = `https://points-dev-jeqd.3.us-1.fl0.io/recycling-center/point/${id}`;
    fetchDataFronJson(url)
      .then((data) => {
        setPointData(data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        setPointData([]);
      });
  }, [id]);

  return (
    <>
      <div className="mt-1 p-4  rounded-lg ">
        <div className="flex items-center mt-2">
          <img src={pointData?.imagen} alt="Imagen" className="w-16 h-16 rounded-full mr-2" />
          <div className="flex flex-col">
            <h2 className="text-4xl font-bold ">{pointData?.nombre}</h2>
            <p className="text-gray-600">{pointData?.ubicacion}</p>
            <p className="text-gray-600">{pointData?.horario_atencion}</p>
          </div>
        </div>
        <div className="flex items-center mt-2">
          <p className="text-gray-600"></p>
        </div>
        <div className="mt-2">
          <DetailMap latLng={pointData.latLng} />
          <p className="text-gray-600">
            Materiales:{' '}
            {pointData?.tipoMaterialAcepta?.length > 0 ? pointData?.tipoMaterialAcepta?.join(', ') : 'No especificado'}
          </p>
        </div>
      </div>
    </>
  );
};

export default DetailPoint;
