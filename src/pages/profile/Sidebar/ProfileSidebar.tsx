import React from 'react';
import { Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import './sidebar.component.scss';

interface ProfileSidebarProps {
    mobileView?: boolean;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ mobileView }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const currentPath = location.pathname.split('/').pop() || 'general';

    const menuItems = [
        {
            key: 'general',
            label: 'General information',
            className: currentPath === 'general' ? 'ant-menu-item-selected' : 'ant-menu-item',
        },
        {
            key: 'messages',
            label: 'Messages',
            className: currentPath === 'messages' ? 'ant-menu-item-selected' : 'ant-menu-item',
        },
        {
            key: 'orders',
            label: 'Orders',
            className: currentPath === 'orders' ? 'ant-menu-item-selected' : 'ant-menu-item',
        },
        {
            key: 'addresses',
            label: 'Addresses',
            className: currentPath === 'addresses' ? 'ant-menu-item-selected' : 'ant-menu-item',
        },
    ];

    return (
        <Menu
            mode="inline"
            selectedKeys={[currentPath]}
            items={menuItems}
            onClick={({ key }) => navigate(key)}
            className="sidebar"
            theme="light"
        />
    );
};

export default ProfileSidebar;