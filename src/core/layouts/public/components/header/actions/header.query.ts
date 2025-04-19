import { useQuery } from 'react-query';
import { IBasketResponse } from '../header';
import { getAllUsers, getAllUsersForSeller, getBasket, getUser } from './header.service';

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

export const useGetAllUsers = () => {
  return useQuery<any[], Error>(
    ['users'],
    () => {
      return getAllUsers();
    },
    {
      refetchOnWindowFocus: false,
    }
  );
};

export const useGetAllUsersForSeller = () => {
  return useQuery<any[], Error>(
    ['users'],
    () => {
      return getAllUsersForSeller();
    },
    {
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