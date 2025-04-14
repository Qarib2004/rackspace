import axiosInstance from 'core/configs/axios.config';

export const getProduct = async (title: any) => {
    const res = await axiosInstance.get(`products?search[name]=${title}`);
    return res.data;
};