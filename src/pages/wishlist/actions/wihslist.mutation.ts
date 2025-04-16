import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} from './wishlist.service';
import { WishlistResponse } from '../wishlist';



export const useAddToWishlist = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation<WishlistResponse, Error, { productId: string }>(
    ({ productId }) => addToWishlist(userId, productId),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(['wishlist', userId], data);
      },
    }
  );
};

export const useRemoveFromWishlist = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation<WishlistResponse, Error, { productId: string }>(
    ({ productId }) => removeFromWishlist(userId, productId),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(['wishlist', userId], data);
      },
    }
  );
};

export const useClearWishlist = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation<WishlistResponse, Error>(
    () => clearWishlist(userId),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(['wishlist', userId], data);
      },
    }
  );
};
