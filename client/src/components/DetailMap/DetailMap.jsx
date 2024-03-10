/* eslint-disable*/

import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

export const DetailMap = ({ latLng }) => {
  if (!latLng || (!latLng.lat && !latLng.lng)) {
    return <p>No se pudo mostrar el mapa</p>;
  }
  const markIcon = new Icon({
    iconUrl: 'https://cdn1.iconfinder.com/data/icons/flat-flags-1/32/flag_green-favorites-512.png',
    iconSize: [48, 48],
  });

  return (
    <MapContainer
      className="h-[60vh] sm:w-2/4 mx-auto relative  sm:mt-10"
      center={{ lat: latLng.lng, lng: latLng.lat }}
      zoom={15}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution="OpenStreetMap DE"
        url="https://tile.openstreetmap.de/{z}/{x}/{y}.png"
        key="b628c55280msheb2b2ae6c91c18bp1c71bejsncdb5e88638d6"
      />

      <Marker icon={markIcon} position={[latLng.lng, latLng.lat]}></Marker>
    </MapContainer>
  );
};
