import axiosInstance from 'core/configs/axios.config';

export const getUser = async (id: any) => {
    const res = await axiosInstance.get(`users/${id}`);
    return res.data;
};