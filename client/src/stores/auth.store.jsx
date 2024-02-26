import { create } from "zustand";

export const useAuthStore = create((set) => ({
    isAuth: true,
    email: '',
    setEmail: (value) => set({ email: value }),
    password: '',
    setPassword: (value) => set({ password: value}),

    user: {}
    // setUser: (value) => set({ user: value }),
    // token: localStorage.getItem('token' || ''),
    // setToken: (value) => {localStorage},
    // navigate: useNavigate(),
}))
