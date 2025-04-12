import { useQuery } from 'react-query';
import { getProduct } from './search.service';

export const useGetProduct = (title: any) => {
    return useQuery<any, Error>(
        ['user', title],
        () => {
            return getProduct(title);
        },
        {
            enabled: !!title,
            refetchOnWindowFocus: false,
        }
    );
};
