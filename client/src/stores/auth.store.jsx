import { create } from "zustand";

export const useAuthStore = create((set) => ({
    isAuth: true,
    email: '',
    setEmail: (value) => set({ email: value }),
    password: '',
    setPassword: (value) => set({ password: value})
}))
