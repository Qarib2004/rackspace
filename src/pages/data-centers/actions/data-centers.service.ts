import axiosInstance from '../../../core/configs/axios.config';
import {API} from '../../../core/configs/api.config';
import {DateCenterModel} from '../models/date-center.model';
import {IDataCenter} from '../data-centers.d';

export const getDataCenters = async (): Promise<IDataCenter[]> => {
    const res = await axiosInstance.get(API.getDataCenters);
    return res.data.map((item: any) => new DateCenterModel(item));

};

