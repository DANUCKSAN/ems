// src/components/pages/hostRegister/HostRegister.js
import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, Select, message } from 'antd';
import moment from 'moment';
import './HostRegister.css';
import logo from '../../../assets/logo.svg';

const { Option } = Select;

const HostRegister = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    const payload = {
      ...values,
      dateOfBirth: values.dateOfBirth.format('YYYY-MM-DD'),
    };

    try {
      const response = await fetch('http://localhost:8080/api/hosts/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      message.success('🎉 Registration successful! You can now login.');
    } catch (error) {
      message.error(`❗ Registration failed: ${error.message}`);
    }

    setLoading(false);
  };

  const disabledDate = (current) => current && current > moment().subtract(18, 'years').endOf('day');

  return (
    <div className="register-container">
      <div className="register-left">
        <img src={logo} alt="Logo" className="register-logo" />
        <h2>Become a Host</h2>
        <p>
          Join our platform and start managing your own events across Music, Business, Education, and Sports. Your audience awaits!
        </p>
      </div>

      <div className="register-form-container">
        <Form layout="vertical" onFinish={onFinish} style={{ width: '100%' }}>
          <Form.Item name="firstName" label="First Name" rules={[{ required: true }]}>
            <Input placeholder="First Name" />
          </Form.Item>

          <Form.Item name="lastName" label="Last Name" rules={[{ required: true }]}>
            <Input placeholder="Last Name" />
          </Form.Item>

          <Form.Item name="email" label="Email" rules={[{ required: true }, { type: 'email' }]}>
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item name="mobileNumber" label="Mobile Number" rules={[{ required: true }]}>
            <Input placeholder="Mobile Number" />
          </Form.Item>

          <Form.Item name="dateOfBirth" label="Date of Birth" rules={[{ required: true }]}>
            <DatePicker style={{ width: '100%' }} disabledDate={disabledDate} />
          </Form.Item>

          <Form.Item name="eventCategory" label="Event Category" rules={[{ required: true }]}>
            <Select placeholder="Select event category">
              <Option value="music">Music</Option>
              <Option value="business">Business</Option>
              <Option value="educational">Educational</Option>
              <Option value="sports">Sports</Option>
            </Select>
          </Form.Item>

          <Form.Item name="password" label="Password" rules={[{ required: true }, { min: 6 }]} hasFeedback>
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) return Promise.resolve();
                  return Promise.reject(new Error('Passwords do not match'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default HostRegister;
