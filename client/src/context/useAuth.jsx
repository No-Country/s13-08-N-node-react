import { useMemo } from 'react';
import Cookies from 'universal-cookie';
import { loginUser, logoutUser, registerUser } from '../services/users';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const cookies = useMemo(() => new Cookies(), []);
  const navigate = useNavigate();

  // Registro
  const register = async (userData) => {
    try {
      const result = await registerUser(userData);
      console.log(result);
      if (result) {
        console.log('Usuario registrado con éxito', result.message);
        navigate('/auth/login');
      } else {
        console.error('Error al registrar usuario:', result.message);
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  };

  // Inicio de sesión
  const login = async (userData) => {
    console.log(userData);
    try {
      const result = await loginUser(userData);
      console.log(result);
      if (result) {
        cookies.set('token', result.tokenSession);
        cookies.set('role', result.isAdmin);
        navigate('/user');
      } else {
        console.error('Error al iniciar sesión:', result.message);
      }

      return { role: cookies.get('role'), login };
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  // Cerrar sesión
  const logout = async (userData) => {
    try {
      const result = await logoutUser(userData);
      console.log(result);
      if (result) {
        cookies.remove('token');
        cookies.remove('role');
        console.log(result.message);
        navigate('/');
      } else {
        console.error('Error al cerrar sesión:', result.message);
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return { login, logout, register };
};
