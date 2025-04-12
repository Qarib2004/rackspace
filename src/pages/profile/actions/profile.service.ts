import axiosInstance from 'core/configs/axios.config';

export const getUser = async (id: any) => {
    console.log(id);
  const res = await axiosInstance.get(`users/${id}`);
  return res.data;
};