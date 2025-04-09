import axiosInstance from '../../../core/configs/axios.config';
import { API } from '../../../core/configs/api.config';

export const registerService = async (formRequest: any) => {
  try {
    const res = await axiosInstance.post(API.register, formRequest);
    return res.data;

  } catch (error: any) {
    console.error('Qeydiyyat xətası:', error);
    throw new Error(error?.response?.data?.message || 'Qeydiyyat xətası baş verdi!');
  }
};