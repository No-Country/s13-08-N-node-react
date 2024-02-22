import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Popup, Marker, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getUserLocation } from '../../helpers/getUserLocation';
import { fetchDataFronJson } from '../../helpers/fetchDataFromJson';
import { Link } from 'react-router-dom';
import SearchMap from '../SearchMap/SearchMap';
import { Icon } from 'leaflet';

const greenOptions = { color: 'green', fillColor: 'green' };
const redOptions = { color: 'red' };

export const Map = () => {
  const [location, setLocation] = useState([]);
  const [map, setMap] = useState([]);

  useEffect(() => {
    getUserLocation().then((coords) => setLocation(coords));

    fetchDataFronJson('https://points-dev-jeqd.3.us-1.fl0.io/recycling-center/points')
      .then((data) => {
        setMap(data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const userIcon = new Icon({
    iconUrl: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png',
    iconSize: [32, 32],
  });

  // var OpenStreetMap_DE = L.tileLayer('https://tile.openstreetmap.de/{z}/{x}/{y}.png', {
  //   maxZoom: 18,
  //   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  // });

  return (
    <>
      <MapContainer
        className="h-[100vh] sm:h-[50vh] sm:w-3/4 mx-auto relative  sm:mt-10"
        center={{ lat: '-34.582716', lng: '-58.426167' }}
        zoom={15}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution="OpenStreetMap DE"
          url="https://tile.openstreetmap.de/{z}/{x}/{y}.png"
          key="b628c55280msheb2b2ae6c91c18bp1c71bejsncdb5e88638d6"
        />

        {/* <Marker position={{ lat: 'longitud', lng: 'latitud' }}>
          <Popup>Tu ubicación actual.</Popup>
        </Marker> */}

        <Circle center={{ lat: '-34.582716', lng: '-58.426167' }} pathOptions={greenOptions} radius={800}>
          <Marker position={['-34.582716', '-58.426167']} pathOptions={redOptions} icon={userIcon} radius={3}>
            <Popup>
              <p className=" text-center">
                tu loc actual: lng: {location[0]} lat: {location[1]}{' '}
              </p>
            </Popup>
          </Marker>
        </Circle>
        {/* <Marker center={{ lat: '-34.582716', lng: '-58.426167' }} pathOptions={redOptions} radius={3} /> */}

        {/* MAPEO DE UBICACIONES HARCODEADAS EN COMPONENTE */}
        {/* {ubicaciones.map((ubicacion, index) => (
          <Marker key={index} position={[ubicacion.latLng.lat, ubicacion.latLng.lng]}>
            <Popup>
              {ubicacion.img ? <img src={ubicacion.img} alt={ubicacion.titulo} /> : null}
              <br />
              <span className="text-green-900 text-lg font-bold">{ubicacion.nombre}</span> <br />
              {ubicacion.direccion} <br />⌚ {ubicacion.horario} <br />
            </Popup>
          </Marker>
        ))} */}

        {/* MAPEO DE UBICACIONES MOCKEADAS CON FAKE JSON TRAIDAS DESDE mapMock.js */}
        {map.map((ubicacion, index) => (
          <Marker key={index} position={[ubicacion.latLng.lng, ubicacion.latLng.lat]}>
            <Popup minWidth={300}>
              <div className="flex flex-row gap-4">
                <img
                  className="w-1/3 h-2/3"
                  src="https://defensoria.org.ar/wp-content/uploads/2022/12/Punto-Verde-scaled-1.jpg"
                  alt={ubicacion.nombre}
                />
                <div className="flex flex-col justify-between">
                  <div>
                    <span className="text-green-900 text-lg font-bold">{ubicacion.nombre}</span> <br />
                    Materiales: {ubicacion.tipoMaterialAcepta.join(', ')}
                    <br />
                    Horario: {ubicacion.horario_atencion} <br />
                  </div>
                  <div className="text-right">
                    <button className="bg-transparent p-0">
                      <Link to={ubicacion._id}> Ir allá. </Link>
                    </button>
                  </div>
                </div>
              </div>
              {/* Condición para verificar si existe ubicacion.img */}
            </Popup>
          </Marker>
        ))}
        <div className=" w-full" style={{ position: 'absolute', top: '10px', left: '10px', zIndex: '1000' }}>
          <SearchMap />
        </div>
      </MapContainer>
    </>
  );
};
