import React from 'react';
import { Layout, Menu } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './profile.component.scss';
import ProfileSidebar from './Sidebar/ProfileSidebar';

const { Content, Sider } = Layout;

const ProfileComponent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop() || 'general';

  const menuItems = [
    { key: 'general', label: 'General' },
    { key: 'messages', label: 'Messages' },
    { key: 'orders', label: 'Orders' },
    { key: 'addresses', label: 'Addresses' },
  ];

  return (
    <Layout className="profile-layout">
      <Menu
        mode="horizontal"
        selectedKeys={[currentPath]}
        className="mobile-top-nav visible-mobile"
        onClick={({ key }) => navigate(key)}
      >
        {menuItems.map(item => (
          <Menu.Item key={item.key}>
            {item.label}
          </Menu.Item>
        ))}
      </Menu>

      <Layout>
        <Sider 
          width={250}
          className="profile-sidebar hidden-mobile"
          theme="light"
        >
          <ProfileSidebar />
        </Sider>

        <Content className="profile-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default ProfileComponent;