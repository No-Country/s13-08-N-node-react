import { useMemo } from 'react';
import Cookies from 'universal-cookie';
import { loginUser } from '../services/users';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const cookies = useMemo(() => new Cookies(), []);
  console.log(cookies.get('token'));
  console.log(cookies.get('role'));
  const navigate = useNavigate();

  const login = async(userData) => {
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

  return { login };
};
