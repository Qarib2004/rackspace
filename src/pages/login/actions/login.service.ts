import axiosInstance from '../../../core/configs/axios.config';
import {API} from '../../../core/configs/api.config';

export const loginService = async (formRequest:  any) => {
  const res = await axiosInstance.post(API.login, formRequest);
  return res.data;
};

export const getAllProducts = async () => {
  const res = await axiosInstance.get(API.products);
  return res.data;
};

