import React from 'react';
import { Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import './sidebar.component.scss';

const ProfileSidebar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        {
            key: 'general',
            label: 'General information',
        },
        {
            key: 'messages',
            label: 'Messages',
        },
        {
            key: 'orders',
            label: 'Orders',
        },
        {
            key: 'addresses',
            label: 'Addresses',

        },
    ];

    return (
        <Menu
            mode="inline"
            selectedKeys={[location.pathname.substring(1) || 'general']}
            items={menuItems}
            onClick={({ key }) => navigate(`${key}`)}
            className="sidebar"
        />
    );
};

export default ProfileSidebar;