import { API } from 'core/configs/api.config';
import axiosInstance from 'core/configs/axios.config';
import { IBasketResponse } from '../header';

export const getUser = async (id: any) => {
  const res = await axiosInstance.get(`users/${id}`);
  return res.data;
};

export const getBasket = async (userId: string): Promise<IBasketResponse> => {
  try {
    const res = await axiosInstance.get(`${API.basket}`);
    return res.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getAllUsers = async () => {
  const res = await axiosInstance.get('users');
  return res.data.data; 
};

export const getAllUsersForSeller = async () => {
  const res = await axiosInstance.get('users?role=seller');
  return res.data.data; 
};



export const updateUser = async (updatedData: { id: string; body: any }) => {
  const res = await axiosInstance.patch(`users/${updatedData.id}`, updatedData.body);
  return res.data.data.user;
};

export const deleteUser = async (id: string) => {
  const res = await axiosInstance.delete(`users/${id}`);
  return res.data;
};



