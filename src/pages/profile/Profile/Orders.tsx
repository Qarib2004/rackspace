import React, { useState } from 'react';
import { Input, Table, Button, Select } from 'antd';
import { Search, Settings } from 'lucide-react';
import './profile.stye.scss';

const Orders: React.FC = () => {
    const [searchText, setSearchText] = useState('');

    const columns = [
        {
            title: 'Order No.',
            dataIndex: 'orderNo',
            sorter: true,
            width: '20%',
        },
        {
            title: 'Producer',
            dataIndex: 'producer',
            sorter: true,
            width: '25%',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            sorter: true,
            width: '15%',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            sorter: true,
            width: '20%',
        },
        {
            title: 'Order date',
            dataIndex: 'orderDate',
            sorter: true,
            width: '20%',
        },
    ];

    return (
        <div className="orders-container">
            <div className="orders-header">
                <h1>Orders</h1>
                <p className="subtitle">Check the history and status of your orders.</p>
            </div>

            <div className="search-section">
                <div className="search-wrapper">
                    <Input
                        placeholder="Search"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        suffix={<Search size={18} className="search-icon" />}
                    />
                </div>
            </div>

            <div className="table-container">
                <div className="table-header">
                    <div className="table-actions">
                        <Select
                            defaultValue="15"
                            className="page-size-select"
                            options={[
                                { value: '15', label: '15' },
                                { value: '30', label: '30' },
                                { value: '50', label: '50' },
                            ]}
                        />
                        <span className="results-count">0 results</span>
                    </div>
                    <Button type="text" icon={<Settings size={18} />} className="settings-button" />
                </div>

                <Table
                    columns={columns}
                    dataSource={[]}
                    pagination={false}
                    locale={{ emptyText: 'No results' }}
                    className="orders-table"
                />
            </div>
        </div>
    );
};

export default Orders;