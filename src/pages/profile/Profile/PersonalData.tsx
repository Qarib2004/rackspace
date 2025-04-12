import React from 'react';
import { Card, Avatar, Typography, Button } from 'antd';
import { Edit } from 'lucide-react';
import './profile.stye.scss';
import Password from './Password';
import { useStore } from 'store/store.config';
import { useGetUser } from '../actions/profile.query';

const { Title, Text } = Typography;

const PersonalData: React.FC = () => {
  const userCredential = useStore('user');
  const { data: userData } = useGetUser(userCredential?.id);

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
            <Avatar
              size={64}
              src={userData?.photo || 'https://joeschmoe.io/api/v1/random'}
              className="profile-section__avatar"
            />
          </div>
          <div className="profile-section__personal-info-content">
            <div className="profile-section__personal-info-header">
              <div className="profile-section__personal-info-details">
                <Title level={5}>{userData?.fullname}</Title>
                <Text className="contact-info block">{userData?.email}</Text>
                <Text className="contact-info block">{userData?.phoneNumber}</Text>
              </div>
              <Button
                type="text"
                icon={<Edit size={16} />}
                className="profile-section__edit-button"
              />
            </div>
            <div className="profile-section__tin-section">
              <Text className="tin-label block">City </Text>
              <Text className="tin-value">{userData?.city}</Text>
            </div>
          </div>
        </div>
      </Card>
      <Password />
    </>
  );
};

export default PersonalData;