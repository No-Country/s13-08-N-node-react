import { useMemo } from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { loginUser, logoutUser, registerUser } from '../services/users';
import { loginCompany, logoutCompany, registerCompany } from '../services/empresas';

export const useAuth = () => {
  const cookies = useMemo(() => new Cookies(), []);
  const navigate = useNavigate();

  // Usuairo Reciclador

  // Registro
  const registerUsuario = async (userData) => {
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
  const loginUsuario = async (userData) => {
    try {
      const result = await loginUser(userData);
      console.log(result);
      if (result) {
        cookies.set('token', result.tokenSession);
        cookies.set('role', result.isAdmin);
        cookies.set('points', result.puntos);
        cookies.set('name', result.nombre);
        cookies.set('email', result.email);
        navigate('/user');
      } else {
        console.error('Error al iniciar sesión:', result.message);
      }

      return { role: cookies.get('role'), loginUsuario };
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  // Cerrar sesión
  const logoutUsuario = async (userData) => {
    try {
      const result = await logoutUser(userData);
      console.log(result);
      if (result) {
        cookies.remove('token');
        cookies.remove('role');
        cookies.remove('points');
        cookies.remove('name');
        cookies.remove('email');
        console.log(result.message);
        navigate('/');
      } else {
        console.error('Error al cerrar sesión:', result.message);
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  // Usuairo Empresa

  // Registro
  const registerEmpresa = async (companyData) => {
    try {
      const result = await registerCompany(companyData);
      console.log(result);
      if (result) {
        console.log('Usuario registrado con éxito', result.message);
        navigate('/auth');
      } else {
        console.error('Error al registrar usuario:', result.message);
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  };

  // Inicio de sesión
  const loginEmpresa = async (companyData) => {
    try {
      const result = await loginCompany(companyData);
      console.log(result);
      if (result) {
        cookies.set('token', result.tokenSession);
        cookies.set('nameCompany', result.nombreempresa);
        cookies.set('emailCompany', result.emailempresa);
        navigate('/company');
      } else {
        console.error('Error al iniciar sesión:', result.message);
      }

      return { role: cookies.get('role'), loginEmpresa };
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  // Cerrar sesión
  const logoutEmpresa = async (companyData) => {
    try {
      const result = await logoutCompany(companyData);
      console.log(result);
      if (result) {
        cookies.remove('token');
        cookies.remove('nameCompany');
        cookies.remove('emailCompany');
        console.log(result.message);
        navigate('/');
      } else {
        console.error('Error al cerrar sesión:', result.message);
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return { loginUsuario, logoutUsuario, registerUsuario, loginEmpresa, logoutEmpresa, registerEmpresa };
};
