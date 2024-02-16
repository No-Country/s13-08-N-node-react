import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Popup, Marker, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getUserLocation } from '../../helpers/getUserLocation';

import mapMock from '../../mocks/mapMock';

const ubicaciones = [
  {
    nombre: 'EcoReciclaje',
    latLng: { lat: '-34.574716', lng: '-58.421167' },
    horario: '09:00 a 18:00',
    direccion: 'Calle 123',
  },
  {
    nombre: 'EcoVerde',
    img: 'https://media.tenor.com/qG-IUmC8wQgAAAAM/pepe-tired-done.gif',
    latLng: { lat: '-34.580716', lng: '-58.432167' },
    horario: '10:00 a 19:00',
    direccion: 'Avenida Principal 456',
  },
  {
    nombre: 'ReciGreen',
    latLng: { lat: '-34.583716', lng: '-58.426167' },
    horario: '08:00 a 17:00',
    direccion: 'Calle Secundaria 789',
  },
  {
    nombre: 'EcoReutiliza',
    latLng: { lat: '-34.576716', lng: '-58.424167' },
    horario: '11:00 a 20:00',
    direccion: 'Avenida Principal 0123',
  },
];

const greenOptions = { color: 'green', fillColor: 'green' };
const purpleOptions = { color: 'red' };

export const Map = () => {
  const [location, setLocation] = useState([]);
  const [map, setMap] = useState({});

  useEffect(() => {
    getUserLocation().then((coords) => setLocation(coords));
    setMap(mapMock);
    console.log(map);
  }, []);

  // var OpenStreetMap_DE = L.tileLayer('https://tile.openstreetmap.de/{z}/{x}/{y}.png', {
  //   maxZoom: 18,
  //   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  // });

  return (
    <>
      <MapContainer
        className="h-[100vh] sm:h-[50vh] sm:w-3/4 mx-auto relative z-0"
        center={{ lat: '-34.582716', lng: '-58.426167' }}
        zoom={15}
        scrollWheelZoom={true}
      >
        {/* <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        /> */}
        {/* b628c55280msheb2b2ae6c91c18bp1c71bejsncdb5e88638d6 */}
        <TileLayer
          attribution="OpenStreetMap DE"
          url="https://tile.openstreetmap.de/{z}/{x}/{y}.png"
          key="b628c55280msheb2b2ae6c91c18bp1c71bejsncdb5e88638d6"
        />

        {/* <Marker position={{ lat: 'longitud', lng: 'latitud' }}>
          <Popup>Tu ubicación actual.</Popup>
        </Marker> */}

        <Circle center={{ lat: '-34.579716', lng: '-58.426167' }} pathOptions={purpleOptions} radius={3} />

        <Circle center={{ lat: '-34.579716', lng: '-58.426167' }} pathOptions={greenOptions} radius={800}>
          <Popup>Tu ubicación actual.</Popup>
        </Circle>

        {/* MAPEO DE UBICACIONES HARCODEADAS EN COMPONENTE */}
        {ubicaciones.map((ubicacion, index) => (
          <Marker key={index} position={[ubicacion.latLng.lat, ubicacion.latLng.lng]}>
            <Popup>
              {ubicacion.img ? <img src={ubicacion.img} alt={ubicacion.titulo} /> : null}
              <br />
              {/* Condición para verificar si existe ubicacion.img */}
              <span className="text-green-900 text-lg font-bold">{ubicacion.nombre}</span> <br />
              {ubicacion.direccion} <br />⌚ {ubicacion.horario} <br />
            </Popup>
          </Marker>
        ))}

        {/* MAPEO DE UBICACIONES MOCKEADAS CON FAKE JSON TRAIDAS DESDE mapMock.js */}
        {mapMock.features.map((ubicacion, index) => (
          <Marker key={index} position={[ubicacion.geometry.coordinates[1], ubicacion.geometry.coordinates[0]]}>
            <Popup>
              {ubicacion.img
                ? (
                <img src={ubicacion.geometry.coordinates[0]} alt={ubicacion.geometry.coordinates[1]} />
                  )
                : null}
              <br />
              {/* Condición para verificar si existe ubicacion.img */}
              <span className="text-green-900 text-lg font-bold">{ubicacion.properties.cooperativ}</span> <br />
              {ubicacion.properties.direccion} <br />⌚ {ubicacion.properties.dia_hora} <br />
              MAS INFO: {ubicacion.properties.mas_info}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <p>
        lat {location[0]} lng {location[1]}
      </p>
    </>
  );
};
