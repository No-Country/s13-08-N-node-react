/* eslint-disable */

import useMapSearch from '../../stores/mapSearchStore';

export const SearchResult = ({ results, result }) => {
  const { actualizarSelectedMapPoint } = useMapSearch();

  const handleClick = (result) => {
    const objetoEncontrado = results.find((objeto) => objeto.nombre === result);

    actualizarSelectedMapPoint(objetoEncontrado.latLng);
  };

  return (
    <div className="hover:bg-[#efefef] p-6" onClick={(e) => handleClick(result)}>
      {result}
    </div>
  );
};
