import React from 'react';
import { Card, Avatar, Typography, Button } from 'antd';
import { Edit } from 'lucide-react';
import './profile.stye.scss';
import Password from './Password';

const { Title, Text } = Typography;

interface UserData {
  name: string;
  email: string;
  phone: string;
  tin: string;
}

const PersonalData: React.FC = () => {
  const userData: UserData = {
    name: 'Nurlan',
    email: 'esedovn3@gmail.com',
    phone: '0554960633',
    tin: '123456789',
  };

  return (
    <>
      <Card className="profile-section__card">
        <Title level={4} className="profile-section__card-title">
          Personal data
        </Title>
        <Text className="profile-section__card-description">
          Check and edit here all the information of your profile on the platform.
        </Text>

        <div className="profile-section__personal-info">
          <div className="profile-section__personal-info-avatar">
            <Avatar size={64}>{userData.name[0]}</Avatar>
          </div>
          <div className="profile-section__personal-info-content">
            <div className="profile-section__personal-info-header">
              <div className="profile-section__personal-info-details">
                <Title level={5}>{userData.name}</Title>
                <Text className="contact-info block">{userData.email}</Text>
                <Text className="contact-info block">{userData.phone}</Text>
              </div>
              <Button
                type="text"
                icon={<Edit size={16} />}
                className="profile-section__edit-button"
              />
            </div>
            <div className="profile-section__tin-section">
              <Text className="tin-label block">TIN</Text>
              <Text className="tin-value">{userData.tin}</Text>
            </div>
          </div>
        </div>
      </Card>
      <Password />
    </>
  );
};

export default PersonalData;