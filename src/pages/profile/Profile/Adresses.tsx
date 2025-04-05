import React, { useState } from 'react';
import { Input, Table, Button, Select } from 'antd';
import { Search, Settings, Pencil, Search as View, Trash2 } from 'lucide-react';
import './profile.stye.scss';

const Addresses: React.FC = () => {
    const [searchText, setSearchText] = useState('');

    const columns = [
        {
            title: 'Address',
            dataIndex: 'address',
            sorter: true,
            width: '40%',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: true,
            width: '30%',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            width: '20%',
        },
        {
            title: '',
            key: 'actions',
            width: '10%',
            render: () => (
                <div className="action-buttons">
                    <Button type="text" icon={<Pencil size={16} />} />
                    <Button type="text" icon={<View size={16} />} />
                    <Button type="text" icon={<Trash2 size={16} />} />
                </div>
            ),
        },
    ];

    const data = [
        {
            key: '1',
            address: 'Sumgait',
            name: 'Nurlan',
            type: 'Both',
        },
    ];

    return (
        <div className="addresses-container">
            <div className="addresses-header">
                <h1>Addresses</h1>
                <p className="subtitle">Set your delivery and invoicing addresses here.</p>
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
                        <span className="results-count">1 results</span>
                    </div>
                    <Button type="text" icon={<Settings size={18} />} className="settings-button" />
                </div>

                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    className="addresses-table"
                />

                <div className="new-address-section">
                    <Button type="primary" className="new-address-button">
                        + New address
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Addresses;