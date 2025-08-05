import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, message, Card } from 'antd';
import axios from 'axios';
import './UpdateAccount.css'; // 👈 Add this line
import logo from '../../../assets/logo.svg';


const { Option } = Select;

const UpdateAccount = () => {
  const [form] = Form.useForm();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      form.setFieldsValue(storedUser); // populate form
    }
  }, [form]);

  const onFinish = async (values) => {
    try {
      const res = await axios.put(`http://localhost:8080/api/users/${user.id}`, values);
      message.success('Account updated successfully!');
      localStorage.setItem('user', JSON.stringify(res.data));
    } catch (error) {
      console.error(error);
      message.error('Failed to update account.');
    }
  };

  return (
    <div className="update-account-container">
      {/* Left Side Branding */}
      <div className="update-account-left">
        <h1>Update Your Profile</h1>
        <p>
          Keep your information up to date to ensure you get the best personalized experience.
          Your name, contact number, gender, and email help us serve you better.
        </p>
        <img src={logo} alt="Update Illustration" className="update-image" />

      </div>

      {/* Right Side Form */}
      <div className="update-account-right">
        <Card
          title="Update Account"
          bordered={false}
          style={{ width: '100%', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}
        >
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item name="firstName" label="First Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item name="lastName" label="Last Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
              <Input />
            </Form.Item>

            <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item name="nickname" label="Nickname">
              <Input />
            </Form.Item>

            <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
              <Select placeholder="Select gender">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Update
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default UpdateAccount;
