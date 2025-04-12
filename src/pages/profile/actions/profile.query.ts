import { useQuery } from 'react-query';
import { getUser } from './profile.service';

export const useGetUser = (id: any) => {
    return useQuery<any, Error>(
        ['user', id],
        () => {
            console.log(id);
            return getUser(id);
        },
        {
            enabled: !!id,
            refetchOnWindowFocus: false,
        }
    );
};
