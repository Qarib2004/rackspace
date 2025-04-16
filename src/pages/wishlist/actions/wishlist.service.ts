import { API } from 'core/configs/api.config';
import axiosInstance from 'core/configs/axios.config';
import { WishlistResponse } from '../wishlist'; 

export const getWishlist = async (userId: string): Promise<WishlistResponse> => {
  try {
    const res = await axiosInstance.get(`${API.wishlist}`);
    return res.data;
  } catch (error) {
    console.error('Get wishlist error:', error);
    throw error;
  }
};

export const addToWishlist = async (userId: string, productId: string): Promise<WishlistResponse> => {
  try {
    const res = await axiosInstance.post(`${API.wishlist}`, { productId, userId });
    return res.data;
  } catch (error) {
    console.error('Add to wishlist error:', error);
    throw error;
  }
};

export const removeFromWishlist = async (userId: string, productId: string): Promise<WishlistResponse> => {
  try {
    const res = await axiosInstance.delete(`${API.wishlist}/${productId}`);
    return res.data;
  } catch (error) {
    console.error('Remove from wishlist error:', error);
    throw error;
  }
};

export const clearWishlist = async (userId: string): Promise<WishlistResponse> => {
  try {
    const res = await axiosInstance.delete(`${API.wishlist}`);
    return res.data;
  } catch (error) {
    console.error('Clear wishlist error:', error);
    throw error;
  }
};
