import React, { useState } from 'react';
import { Card, Avatar, Typography, Button, Form, Input, Modal } from 'antd';
import { Edit } from 'lucide-react';
import './profile.stye.scss';
import { useUpdatePassword } from '../actions/profile.mutation';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const Password: React.FC = () => {
  const navigate = useNavigate();

  const [isReLoginModalVisible, setIsReLoginModalVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [passwordForm] = Form.useForm();
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const {
    mutate: updatePasswordMutate,
    isLoading,
    error,
  } = useUpdatePassword();

  const handlePasswordEditClick = () => {
    passwordForm.resetFields();
    setIsPasswordModalVisible(true);
  };

  const handlePasswordCancel = () => {
    setIsPasswordModalVisible(false);
  };


  const handlePasswordSubmit = (values: any) => {

    

    if (values.newPassword !== values.confirmNewPassword) {
      passwordForm.setFields([
        {
          name: 'confirmNewPassword',
          errors: ['Parollar uyğun gəlmir'],
        },
      ]);
      return;
    }

    const payload = {
      passwordCurrent: values.currentPassword,
      password: values.newPassword,
      passwordConfirm: values.confirmNewPassword,
    };

    updatePasswordMutate(payload, {
      onSuccess: () => {
        toast.success('Şifrə uğurla dəyişdirildi');
        setIsPasswordModalVisible(false);
        setIsReLoginModalVisible(true);
      },
      onError: (error: any) => {
        if (error.response?.data?.message?.includes('current password') || 
            error.message?.includes('current password') ||
            error.response?.status === 401) {
          passwordForm.setFields([
            {
              name: 'currentPassword',
              errors: ['Cari parol səhvdir'],
            },
          ]);
        } else {
          toast.error('Xəta baş verdi: ' + (error.message || ''));
        }
      },
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');

    setIsAuthenticated(false);

    window.location.reload();
  };

  return (
    <>
      <Card className="profile-section__card">
        <Title level={4} className="profile-section__card-title">
          Password
        </Title>
        <Text className="profile-section__card-description">
          Keep your password secret and secure to protect your account details.
          Change it whenever you consider it necessary.
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
            onClick={handlePasswordEditClick}
          />
        </div>
      </Card>

      <Modal
        title="Change Password"
        open={isPasswordModalVisible}
        onCancel={handlePasswordCancel}
        footer={null}
      >
        <Form
          form={passwordForm}
          layout="vertical"
          onFinish={handlePasswordSubmit}
        >
          <Form.Item
            name="currentPassword"
            label="Current Password"
            rules={[
              { required: true, message: 'Please enter your current password' },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[{ required: true, message: 'Please enter a new password' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirmNewPassword"
            label="Confirm New Password"
            rules={[
              { required: true, message: 'Please confirm your new password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('The passwords do not match')
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '8px',
              }}
            >
              <Button onClick={handlePasswordCancel}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Change Password
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Parol Dəyişildi"
        open={isReLoginModalVisible}
        footer={[
          <Button key="login" type="primary" onClick={handleLogout}>
            Yenidən Daxil ol
          </Button>,
        ]}
        onCancel={() => setIsReLoginModalVisible(false)}
      >
        <Text>
          Parolunuz uğurla dəyişdirildi. Təhlükəsizlik səbəbləri ilə yenidən
          daxil olun.{' '}
        </Text>
      </Modal>
    </>
  );
};

export default Password;
