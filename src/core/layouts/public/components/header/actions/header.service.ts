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
