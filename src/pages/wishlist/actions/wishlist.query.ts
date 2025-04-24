import { useQuery } from 'react-query';
import { WishlistResponse } from '../wishlist';
import { getWishlist } from './wishlist.service';




export const useGetWishlist = (userId: string) => {
    return useQuery<WishlistResponse, Error>(
      ['wishlist', userId],
      () => getWishlist(userId),
      {
        enabled: !!userId,
        refetchOnWindowFocus: false,
      }
    );
  };