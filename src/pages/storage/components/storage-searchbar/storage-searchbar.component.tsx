import './storage-searchbar.component.scss';
import {useMemo} from 'react';
import {Input, Select, Checkbox} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import ButtonComponent from '../../../../core/shared/button/button.component';
import {AddIcon} from '../../../../assets/images/icons/edit';
import {useNavigate} from 'react-router-dom';


function StorageSearchbarComponent() {
    const navigate = useNavigate();

    return (
        <div className={'storage-searchbar'}>
            <div className={'storage-searchbar--wrapper'}>
                <div className={'storage-searchbar--wrapper_search'}>
                    <Input placeholder="Axtar" prefix={<SearchOutlined style={{fontSize: '23.29px'}}/>}/>
                </div>
                <Select
                    placeholder="Avadanlıq tipi filter"
                    optionFilterProp="label"
                    options={[
                        {
                            value: 'test',
                            label: 'test',
                        }
                    ]}
                />
                <Select
                    placeholder="Unit sayı filter"
                    optionFilterProp="label"
                    options={[
                        {
                            value: 'test',
                            label: 'test',
                        }
                    ]}
                />
                <Select
                    placeholder="Marka model adı filter"
                    optionFilterProp="label"
                    options={[
                        {
                            value: 'test',
                            label: 'test',
                        }
                    ]}
                />
            </div>
            <ButtonComponent classNamesComponent={'storage-searchbar--wrapper_button'}

            click={() => {navigate('./add-device');}}>
                <div className={'storage-searchbar--wrapper_button_content'}>
                    <AddIcon/>
                    <p>Cihaz əlavə et</p>
                </div>
            </ButtonComponent>
        </div>
    );
}

export default StorageSearchbarComponent;