import './storage-table.component.scss';
import {TableProps} from 'antd';
import {useCallback, useState} from 'react';
import Table from 'antd/lib/table';
import {ButtonActions, ITableType} from './storage-table.s';
import StorageButtonlistComponent from '../storage-buttonlist/storage-buttonlist.component';
import ModalComponent from '../../../../core/shared/modal/modal.component';
import TableModalHeaderComponent from '../table-modal-header/table-modal-header.component';
import TableModalMainComponent from '../table-modal-main/table-modal-main.component';



function StorageTableComponent() {

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleButtonsClick = useCallback((button: ButtonActions): void => {
        switch (button) {
            case 'move':
                setIsModalOpen(true);
                break;
            case 'delete':
                console.log('delete', button);
                break;
            case 'edit':
                console.log('edit', button);
                break;
            default:
                console.log('click', button);
                break;
        }
    }, [isModalOpen]);


    const data: ITableType[] = [
        {
            inventory: 123451234512345,
            serialNumber: 12345123452334556,
            brand: 'Cisco',
            model: 'SO101010 7637528635',
            deviceType: 'Hub',
            unitCount: 3,
            room: 232
        },
        {
            inventory: 123451234512345,
            serialNumber: 12345123452334556,
            brand: 'Cisco',
            model: 'SO101010 7637528635',
            deviceType: 'Hub',
            unitCount: 3,
            room: 232
        }
    ];

    const columns: TableProps<ITableType>['columns'] = [
        {
            title: 'İnventar nömrəsi',
            dataIndex: 'inventory',
            key: 'inventory',
        },
        {
            title: 'Seriya nömrəsi',
            dataIndex: 'serialNumber',
            key: 'serialNumber',
        },
        {
            title: 'Marka adı',
            dataIndex: 'brand',
            key: 'brand',
        },
        {
            title: 'Model',
            dataIndex: 'model',
            key: 'model',
        },
        {
            title: 'Avadanlıq tipi',
            dataIndex: 'deviceType',
            key: 'deviceType',
        },
        {
            title: 'Unit sayı',
            dataIndex: 'unitCount',
            key: 'unitCount',
        },
        {
            title: 'Otaq',
            dataIndex: 'room',
            key: 'room',
        },
        {
            title: '',
            width: '150px',
            render: () => {
                return (
                    <StorageButtonlistComponent buttonsFunction={handleButtonsClick}/>
                );
            }
        }
    ];

    return (
        <>
            <div className={'storage-table'}>
                <Table<ITableType>
                    columns={columns}
                    dataSource={data}
                    className={'storage-table--self'}
                    rowClassName={'storage-table--row'}
                />
            </div>
            <ModalComponent isOpen={isModalOpen}
                            width={888}
                            handleCancel={() => setIsModalOpen(false)}
                            headerContent={
                                <TableModalHeaderComponent/>
                            }
                            mainContent={
                                <>
                                    <TableModalMainComponent closeFn={closeModal}/>
                                </>
                            }


            />
        </>
    );
}

export default StorageTableComponent;