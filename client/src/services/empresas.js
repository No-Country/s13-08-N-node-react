import { axiosClient } from './axiosClient';

// Users auth

export const registerCompany = async (companyData) => {
  const result = await axiosClient.post('/authEmpresa/RegisterRecyclingCompany', companyData);
  return result.data;
};

export const loginCompany = async (companyData) => {
  const result = await axiosClient.post('/authEmpresa/loginCompany', companyData);
  return result.data;
};

export const logoutCompany = async (companyData) => {
  const result = await axiosClient.post('/authEmpresa/logoutCompany', companyData);
  return result.data;
};
