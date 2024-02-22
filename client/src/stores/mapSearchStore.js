/* eslint-disable */

import { create } from 'zustand';

// Define el store con Zustand
const useMapSearch = create((set) => ({
    // Objeto inicial
    selectedMapPoint: {},

    // Función para actualizar el objeto global
    actualizarSelectedMapPoint: (nuevoObjeto) => set({ selectedMapPoint: nuevoObjeto }),
}));

export default useMapSearch;
