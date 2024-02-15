import { create } from 'zustand';
import { persist } from "zustand/middleware";

export const useMongoDBStore = create(persist(() => 
  ({
    trial: 'from MongoDB Store!',
  }),
  {
    name: "localStoragePersist"
  }
));

export const useMongoDBStoreNoPersist = create(() => ({

}));



