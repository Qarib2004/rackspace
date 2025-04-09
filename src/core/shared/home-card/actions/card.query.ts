import {useQuery} from 'react-query';
import {getAllProducts} from './card.service';

export const useGetProducts = () => {
  return useQuery<any, Error>(['products'], () => {
    return getAllProducts();
  }, {
    refetchOnWindowFocus: false,
  });
};


