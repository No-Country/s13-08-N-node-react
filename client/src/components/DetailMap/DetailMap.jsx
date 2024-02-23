/* eslint-disable*/

import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export const DetailMap = ({ latLng }) => {
  // Verificar si latLng tiene un valor válido antes de renderizar
  if (!latLng || (!latLng.lat && !latLng.lng)) {
    return <p>No se pudo mostrar el mapa</p>;
  }

  return (
    <MapContainer
      className="h-[30vh] sm:w-2/4 mx-auto relative  sm:mt-10"
      center={{ lat: latLng.lng, lng: latLng.lat }}
      zoom={15}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution="OpenStreetMap DE"
        url="https://tile.openstreetmap.de/{z}/{x}/{y}.png"
        key="b628c55280msheb2b2ae6c91c18bp1c71bejsncdb5e88638d6"
      />

      <Marker position={[latLng.lng, latLng.lat]}></Marker>
    </MapContainer>
  );
};
