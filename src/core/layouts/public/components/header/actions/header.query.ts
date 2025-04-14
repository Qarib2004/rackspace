import { useQuery } from 'react-query';
import { IBasketResponse } from '../header';
import { getBasket, getUser } from './header.service';

export const useGetUser = (id: any) => {
  return useQuery<any, Error>(
    ['user', id],
    () => {
      return getUser(id);
    },
    {
      enabled: !!id, 
      refetchOnWindowFocus: false,
    }
  );
};

export const useGetBasketCount = (userId: string) => {
    return useQuery<IBasketResponse, Error>(
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