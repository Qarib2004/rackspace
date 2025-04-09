import axiosInstance from '../../../core/configs/axios.config';
import { API } from '../../../core/configs/api.config';

export const loginService = async (formRequest: any) => {
  try {
    const res = await axiosInstance.post(API.login, formRequest);
    return res.data;
  } catch (error: any) {
    // console.error('Server Error:', error.response.data.error);
    throw new Error(error.response.data?.error || 'Server error occurred.');
  }
};

// export const getAllProducts = async () => {
//   const res = await axiosInstance.get(API.products);
//   return res.data;
// };

