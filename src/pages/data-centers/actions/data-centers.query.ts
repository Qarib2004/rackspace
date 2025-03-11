import {useQuery} from 'react-query';
import {getDataCenters} from './data-centers.service';
import {IDataCenter} from '../data-centers.d';

export const useGetDataCenters = () => {
    return useQuery<IDataCenter[], Error>(['dataCenters'], () => {
        return getDataCenters();
    });
};
