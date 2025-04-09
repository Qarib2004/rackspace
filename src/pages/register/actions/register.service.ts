import axiosInstance from '../../../core/configs/axios.config';
import {API} from '../../../core/configs/api.config';

export const registerService = async (formRequest:  any) => {
  const res = await axiosInstance.post(API.register, formRequest);
  return res.data;
};