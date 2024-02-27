import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Popup, Marker, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getUserLocation } from '../../helpers/getUserLocation';
import { fetchDataFronJson } from '../../helpers/fetchDataFromJson';
import { Link } from 'react-router-dom';
import SearchMap from '../SearchMap/SearchMap';
import { Icon } from 'leaflet';
import { SearchResultsList } from '../SearchResultsList/SearchResultsList';
import useMapSearch from '../../stores/mapSearchStore';
import ModalPoint from '../ModalPoint/ModalPoint';

const greenOptions = { color: 'green', fillColor: 'green' };
const redOptions = { color: 'red' };

export const Map = () => {
  const [location, setLocation] = useState([]);
  const [map, setMap] = useState([]);
  const [results, setResults] = useState([]);
  const [radiusCircle, setRadiusCircle] = useState(800);
  const [zoomRadius, setZoomRadius] = useState(15);
  const [modalVisible, setModalVisible] = useState(false);
  const [initialPoint, setInitialPoint] = useState({ lat: '-34.582716', lng: '-58.426167' });

  const { selectedMapPoint } = useMapSearch();

  const cerrarModal = async (selectedMaterialIds) => {
    if (selectedMaterialIds && selectedMaterialIds.length > 0) {
      try {
        const requests = selectedMaterialIds.map((id) =>
          fetch(`https://points-89az.onrender.com/recycling-center/filter-points-by-materials/${id}`).then(
            (response) => {
              return response.json();
            }
          )
        );

        const responses = await Promise.all(requests);
        const filteredResponses = responses.filter((data) => !data.error);
        const combinedData = filteredResponses.reduce((acc, curr) => acc.concat(curr), []);
        // console.log(combinedData);
        if (combinedData.length > 0) {
          setZoomRadius(12);
          setRadiusCircle(0);
          setMap(combinedData);
        }
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    }

    setModalVisible(false);
  };

  useEffect(() => {
    getUserLocation().then((coords) => setLocation(coords));

    fetchDataFronJson('https://points-89az.onrender.com/recycling-center/points')
      .then((data) => {
        setMap(data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  useEffect(() => {}, [zoomRadius, location]);

  useEffect(() => {
    if (Object.keys(selectedMapPoint).length > 0) {
      setInitialPoint((prevState) => {
        const newPoint = { lat: selectedMapPoint.lng, lng: selectedMapPoint.lat };

        return newPoint;
      });
      setRadiusCircle(0);
      setResults([]);
    }
  }, [selectedMapPoint]);

  const userIcon = new Icon({
    iconUrl: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png',
    iconSize: [32, 32],
  });

  const markIcon = new Icon({
    iconUrl: 'https://cdn1.iconfinder.com/data/icons/flat-flags-1/32/flag_green-favorites-512.png',
    iconSize: [48, 48],
  });
  return (
    <>
      <MapContainer
        key={`${initialPoint.lat}-${initialPoint.lng}-${zoomRadius}`}
        className="h-[100vh] sm:h-[50vh] sm:w-3/4 mx-auto relative  sm:mt-10"
        center={initialPoint}
        zoom={zoomRadius}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution="OpenStreetMap DE"
          url="https://tile.openstreetmap.de/{z}/{x}/{y}.png"
          key="b628c55280msheb2b2ae6c91c18bp1c71bejsncdb5e88638d6"
        />

        <Circle center={initialPoint} pathOptions={greenOptions} radius={radiusCircle}>
          <Marker position={['-34.582716', '-58.426167']} pathOptions={redOptions} icon={userIcon} radius={3}>
            <Popup>
              <p className=" text-center">
                tu loc actual: lng: {location[0]} lat: {location[1]}{' '}
              </p>
            </Popup>
          </Marker>
        </Circle>

        {map.map((ubicacion, index) => (
          <Marker key={index} icon={markIcon} position={[ubicacion.latLng.lng, ubicacion.latLng.lat]}>
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
                    Materiales: {ubicacion.materials.join(', ')}
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
            </Popup>
          </Marker>
        ))}
        <div
          className=" w-full flex flex-col justify-end items-end  "
          style={{ position: 'absolute', top: '10px', left: '10px', zIndex: '1000' }}
        >
          <SearchMap setResults={setResults} setModalVisible={setModalVisible} />

          <div className="w-full flex justify-center items-center">
            {results && results.length > 0 && <SearchResultsList results={results} setResults={setResults} />}
          </div>

          {modalVisible && <ModalPoint onClose={cerrarModal} />}
        </div>
      </MapContainer>
    </>
  );
};
