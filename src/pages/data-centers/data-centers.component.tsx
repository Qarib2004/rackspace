import img1 from '../../assets/images/statics/illustration-1.png';
import img2 from '../../assets/images/statics/illustration-2.png';
import img3 from '../../assets/images/statics/illustration-3.png';
import './data-centers.component.scss';
import {useMemo} from 'react';
import DataCenterCardComponent from './components/data-center-card/data-center-card.component';
import {useGetDataCenters} from './actions/data-centers.query';

function DataCentersComponent() {

    const {data} = useGetDataCenters();

    const dataCenters = useMemo(() => {
        if (!data || data.length === 0) {
            return [];
        } else {
            return [
                {
                    name: data[0]?.name || '',
                    description: data[0]?.description || '',
                    img: img1,
                    disabled: false, id: 1,
                },
                {
                    name: data[1]?.name || '',
                    description: data[1]?.description || '',
                    img: img2,
                    disabled: false, id: 2,
                },
                {
                    name: 'Bakı 2 Data mərkəzi',
                    description: 'İstifadəyə hazırlanır',
                    img: img3,
                    disabled: true, id: 3,
                },
            ];
        }
    }, [data]);



    const datacenters = useMemo(() => {
        return dataCenters.map((dataCenter, index) => {
            return (
                <div className={'col-4'}>
                    <DataCenterCardComponent  {...dataCenter}/>
                </div>
            );
        });
    }, [dataCenters]);


    return (
        <div className={'data-centers'}>
            <div className="container">
                <div className="row">
                    {datacenters}
                </div>
            </div>
        </div>
    );
}

export default DataCentersComponent;
