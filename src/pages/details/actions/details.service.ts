import { API } from 'core/configs/api.config';
import axiosInstance from 'core/configs/axios.config';

export const getProductById = async (id: any) => {
    const res = await axiosInstance.get(`${API.products}/${id}`);
    return res.data;
};