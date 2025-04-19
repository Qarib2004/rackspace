import React, { useState } from 'react';
import { Card, Avatar, Typography, Button, Form, Input, Modal } from 'antd';
import { Edit } from 'lucide-react';
import './profile.stye.scss';
import Password from './Password';
import { useStore } from 'store/store.config';
import { useGetUser } from '../actions/profile.query';
import { toast } from 'react-toastify';
import { useUpdateMe, useUpdatePassword } from '../actions/profile.mutation';

const { Title, Text } = Typography;

const PersonalData: React.FC = () => {
  const userCredential = useStore('user');
  const { data: userData } = useGetUser(userCredential?.id);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();

  const { mutate: updateMeMutate } = useUpdateMe();
  const {
    mutate: updatePasswordMutate,
    isLoading,
    error,
  } = useUpdatePassword();

  const handleEditClick = () => {
    form.setFieldsValue({
      fullname: userData?.fullname,
      email: userData?.email,
      phoneNumber: userData?.phoneNumber,
      city: userData?.city,
    });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = (values: any) => {
    updateMeMutate(values, {
      onSuccess: () => {
        toast.success('Profil uğurla yeniləndi');
        setIsModalVisible(false);
      },
      onError: (error: any) => {
        toast.error('Xəta baş verdi');
      },
    });
  };

  return (
    <>
      <Card className="profile-section__card">
        <Title level={4} className="profile-section__card-title">
          Personal data
        </Title>
        <Text className="profile-section__card-description">
          Check and edit here all the information of your profile on the
          platform.
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
                <Text className="contact-info block">
                  {userData?.phoneNumber}
                </Text>
              </div>
              <Button
                type="text"
                icon={<Edit size={16} />}
                className="profile-section__edit-button"
                onClick={handleEditClick}
              />
            </div>
            <div className="profile-section__tin-section">
              <Text className="tin-label block">City </Text>
              <Text className="tin-value">{userData?.city}</Text>
            </div>
          </div>
        </div>
      </Card>

      <Modal
        title="Edit Personal Information"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            fullname: userData?.fullname,
            email: userData?.email,
            phoneNumber: userData?.phoneNumber,
            city: userData?.city,
          }}
        >
          <Form.Item
            name="fullname"
            label="Full Name"
            rules={[{ required: true, message: 'Please enter your full name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="phoneNumber" label="Phone Number">
            <Input />
          </Form.Item>
          <Form.Item name="city" label="City">
            <Input />
          </Form.Item>

          <Form.Item>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '8px',
              }}
            >
              <Button onClick={handleCancel}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Save Changes
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      <Password />
    </>
  );
};

export default PersonalData;
