import { useQuery } from 'react-query';
import { getUser } from './header.service';

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
