import { useQuery } from 'react-query';
import { getProductById } from './details.service';

export const useGetProduct = (id: any) => {
    return useQuery<any, Error>(
        ['user', id],
        () => {
            return getProductById(id);
        },
        {
            enabled: !!id,
            refetchOnWindowFocus: false,
        }
    );
};
