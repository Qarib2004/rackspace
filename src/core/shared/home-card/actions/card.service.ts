import axios from 'axios';
import { API_URL } from 'core/utils/base-url'; 


export const cardService = {
  getAll: () => axios.get(`${API_URL}/products`),
  getById: (id: string) => axios.get(`${API_URL}/products/${id}`),
  create: (data: FormData | object) => axios.post(`${API_URL}/products`, data),
  update: (id: string, data: object) => axios.patch(`${API_URL}/products/${id}`, data),
  delete: (id: string) => axios.delete(`${API_URL}/products/${id}`),
};
