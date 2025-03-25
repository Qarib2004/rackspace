import React from 'react';
import { Card, Typography, Button } from 'antd';
import { Edit } from 'lucide-react';
import './profile.styles.scss';

const { Title, Text } = Typography;

const Password: React.FC = () => {
  return (
    <Card className="profile-section__card">
      <Title level={4} className="profile-section__card-title">
        Password
      </Title>
      <Text className="profile-section__card-description">
        Keep your password secret and secure to protect your account details. Change it whenever you consider it necessary.
      </Text>
      
      <div className="flex justify-between items-center">
        <div>
          <Text className="text-gray-600 block mb-1">Password</Text>
          <Text className="profile-section__password-dots" strong>
            • • • • • • • • • • • •
          </Text>
        </div>
        <Button 
          type="text" 
          icon={<Edit size={16} />}
          className="profile-section__edit-button"
        />
      </div>
    </Card>
  );
};

export default Password;