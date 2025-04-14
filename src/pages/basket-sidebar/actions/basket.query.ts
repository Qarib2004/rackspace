import { useQuery } from 'react-query';
import { getBasket, BasketResponse } from './basket.service';

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