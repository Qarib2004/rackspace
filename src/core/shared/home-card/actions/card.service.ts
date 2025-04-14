import { API } from 'core/configs/api.config';
import axiosInstance from 'core/configs/axios.config';

export const getAllProducts = async () => {
  const res = await axiosInstance.get(API.products);
  return res.data;
};