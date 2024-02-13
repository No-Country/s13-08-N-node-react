import { create } from "zustand";

export const useMongoDBStore = create(() => ({
    trial: 'from MongoDB Store!'
}))