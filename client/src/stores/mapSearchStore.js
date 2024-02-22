import { create } from 'zustand';

const useMapSearch = create((set) => ({
  selectedMapPoint: {},
  actualizarSelectedMapPoint: (nuevoObjeto) => set({ selectedMapPoint: nuevoObjeto }),
}));

export default useMapSearch;
