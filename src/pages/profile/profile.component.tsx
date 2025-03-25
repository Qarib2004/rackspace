import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import './profile.component.scss';
import Sidebar from './Sidebar/Sidebar';

const { Sider, Content } = Layout;

const ProfileComponent: React.FC = () => {
  return (
    <Layout className="profile-layout">
      <Sider 
        width={250} 
        theme="light"
        className="profile-sidebar"
      >
        <Sidebar />
      </Sider>
      <Content className="profile-content">
        <Outlet />
      </Content>
    </Layout>
  );
};

export default ProfileComponent;