import React, { useState } from 'react';
import { Input, Table, Button, Select } from 'antd';
import { Search, Settings } from 'lucide-react';
import './profile.stye.scss';

const Messages: React.FC = () => {
    const [searchText, setSearchText] = useState('');

    const columns = [
        {
            title: 'Msg',
            dataIndex: 'msg',
            sorter: true,
            width: '10%',
        },
        {
            title: 'Subject',
            dataIndex: 'subject',
            sorter: true,
            width: '40%',
        },
        {
            title: 'Sender',
            dataIndex: 'sender',
            sorter: true,
            width: '25%',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            sorter: true,
            width: '25%',
        },
    ];

    return (
        <div className="messages-container">
            <div className="messages-header">
                <h1>Messages</h1>
                <p className="subtitle">Check message history and talk to producers.</p>
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
                    className="messages-table"
                />

                <div className="new-message-section">
                    <Button type="primary" className="new-message-button">
                        + New message
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Messages;