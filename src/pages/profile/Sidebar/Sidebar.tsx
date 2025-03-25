import React from 'react';
import { Menu } from 'antd';
import { User, MessageSquare, ShoppingBag, MapPin } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        {
            key: '/general',
            icon: <User size={18} />,
            label: 'General information',
        },
        {
            key: '/messages',
            icon: <MessageSquare size={18} />,
            label: 'Messages',
        },
        {
            key: '/orders',
            icon: <ShoppingBag size={18} />,
            label: 'Orders',
        },
        {
            key: '/addresses',
            icon: <MapPin size={18} />,
            label: 'Addresses',
        },
    ];

    return (
        <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={({ key }) => navigate(key)}
            className="h-full border-r-0"
        />
    );
};

export default Sidebar;