import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDataFronJson } from '../../helpers/fetchDataFromJson';
import { DetailMap } from '../DetailMap/DetailMap';

const DetailPoint = () => {
  const { id } = useParams();
  const [pointData, setPointData] = useState({});

  useEffect(() => {
    const url = `https://points-production.up.railway.app/points/point/${id}`;
    fetchDataFronJson(url)
      .then((data) => {
        setPointData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        setPointData([]);
      });
  }, [id]);

  return (
    <>
      <DetailMap latLng={pointData.latLng} />
      <div>
        <h2 className="text-4xl">{pointData?.nombre}</h2>
        <p>ID: {id}</p>
        <p>dia y hora: {pointData?.dia_hora}</p>
        <p>imagen: {pointData?.imagen}</p>
        <p>
          lat y lng: {pointData?.latLng?.lat} {pointData?.latLng?.lng}
        </p>
        <p>materiales: {pointData?.materiales?.join(', ')}</p>
      </div>
    </>
  );
};

export default DetailPoint;
