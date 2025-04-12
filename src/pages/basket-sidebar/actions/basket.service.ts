import { API } from 'core/configs/api.config';
import axiosInstance from 'core/configs/axios.config';

export interface BasketItemPayload {
    productId: string;
    quantity: number;
  }

export interface PopulatedProduct {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string[];
  }
  
  export interface BasketItem {
    product: PopulatedProduct;
    quantity: number;
    _id?: string; 
  }
  
 export interface Basket {
    userId: string;
    items: BasketItem[];
    totalPrice: number;
    updatedAt: string;
  }

  export interface BasketResponse {
    status: string;
    data: {
      items: BasketItem[];
      totalPrice: number;
    };
  }
export const getBasket = async (userId: string): Promise<BasketResponse> => {
    try {
      const res = await axiosInstance.get(`${API.basket}`);
      return res.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };

export const addToBasket = async (userId: string, item: BasketItemPayload) => {
    try {
      const res = await axiosInstance.post(`${API.basket}`, { ...item, userId });
      return res.data;
    } catch (error) {
      console.error('Add to basket error:', error);
      throw error;
    }
  };
export const updateBasketItem = async (userId: string, itemId: string, quantity: number): Promise<BasketResponse> => {
  const res = await axiosInstance.patch(`${API.basket}/${userId}/items/${itemId}`, { quantity });
  return res.data;
};

export const removeFromBasket = async (userId: string, itemId: string): Promise<BasketResponse> => {
  const res = await axiosInstance.delete(`${API.basket}/${userId}/items/${itemId}`);
  return res.data;
};
