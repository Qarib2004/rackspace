import { useQuery } from 'react-query';
import { getBasket } from './basket.service';
import { BasketResponse } from '../basket';

export const useGetBasket = (userId: string) => {
  return useQuery<BasketResponse, Error>(
    ['basket', userId],
    () => {
      return getBasket(userId);
    },
    {
      enabled: !!userId,
      refetchOnWindowFocus: false,
    }
  );
};