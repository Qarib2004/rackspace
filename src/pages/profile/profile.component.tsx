import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import './profile.component.scss';
import ProfileSidebar from './Sidebar/ProfileSidebar';

const { Sider, Content } = Layout;

const ProfileComponent: React.FC = () => {
  return (
    <Layout className="profile-layout">
      <Sider 
        width={350} 
        theme="light"
        className="profile-sidebar"
      >
        <ProfileSidebar />
      </Sider>
      <Content className="profile-content">
        <Outlet />
      </Content>
    </Layout>
  );
};

export default ProfileComponent;