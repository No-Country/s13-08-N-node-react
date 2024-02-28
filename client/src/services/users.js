import { axiosClient } from './axiosClient';

// Users auth

export const registerUser = async (userData) => {
  const result = await axiosClient.post('/authUser/registerUser', userData);
  return result.data;
};

export const loginUser = async (userData) => {
  const result = await axiosClient.post('/authUser/loginUser', userData);
  return result.data;
};

export const logoutUser = async (userData) => {
  const result = await axiosClient.post('/authUser/logoutUser', userData);
  return result.data;
};
