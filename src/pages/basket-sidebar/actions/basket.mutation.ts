import { useMutation, useQueryClient } from 'react-query';
import { addToBasket, updateBasketItem, removeFromBasket } from './basket.service';
import { BasketResponse } from '../basket';

export const useAddToBasket = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation<BasketResponse, Error, { item: { productId: string; quantity: number } }>(
    (newItem) => addToBasket(userId, newItem.item),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(['basket', userId], data);
      },
    }
  );
};

export const useUpdateBasketItem = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation<BasketResponse, Error, { itemId: string; quantity: number }>(
    (update) => updateBasketItem(userId, update.itemId, update.quantity),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(['basket', userId], data);
      },
    }
  );
};

export const useRemoveFromBasket = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation<BasketResponse, Error, { itemId: string }>(
    (item) => removeFromBasket(userId, item.itemId),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(['basket', userId], data);
      },
    }
  );
};
