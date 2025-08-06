// src/components/pages/hostRegister/HostRegister.js
import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, Select, message, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import './HostRegister.css';
import logo from '../../../assets/logo.svg';

const { Option } = Select;

const HostRegister = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

      if (response.ok) {
        message.success('🎉 Account created successfully! You can now login.');
        setTimeout(() => navigate('/host-login'), 1200);
      } else {
        const errorData = await response.json();
        if (errorData.message?.includes('Email already in use')) {
          message.error('❗ This email is already registered.');
        } else {
          message.error('❗ Registration failed: ' + (errorData.message || 'Unknown error'));
        }
      }
    } catch (error) {
      message.error(`❗ Server error: ${error.message}`);
    }

    setLoading(false);
  };

  const disabledDate = (current) => {
    return current && current > moment().subtract(18, 'years').endOf('day');
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <img src={logo} alt="Logo" className="register-logo" />
        <h2>Become a Host</h2>
        <p>
          Join our platform and start managing your own events across Music, Business, Education, and Sports.
          Your audience awaits!
        </p>
      </div>

      <div className="register-form-container">
        <Form layout="vertical" onFinish={onFinish} style={{ width: '100%' }}>
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[
              { required: true, message: 'First name is required' },
              { pattern: /^[A-Za-z]+$/, message: 'First name must contain only letters' },
            ]}
          >
            <Input placeholder="First Name" />
          </Form.Item>

          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[
              { required: true, message: 'Last name is required' },
              { pattern: /^[A-Za-z]+$/, message: 'Last name must contain only letters' },
            ]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Email is required' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="mobileNumber"
            label="Mobile Number"
            rules={[{ required: true, message: 'Mobile number is required' }]}
          >
            <Input placeholder="Mobile Number" />
          </Form.Item>

          <Form.Item
  name="dateOfBirth"
  label={
    <span>
      Date of Birth&nbsp;
      <Tooltip title="Host must be at least 18 years old">
        <InfoCircleOutlined />
      </Tooltip>
    </span>
  }
  rules={[
    { required: true, message: 'Please select your date of birth' },
    () => ({
      validator(_, value) {
        if (!value) return Promise.resolve();
        const age = moment().diff(value, 'years');
        if (age >= 18) return Promise.resolve();
        return Promise.reject(new Error('You must be at least 18 years old'));
      },
    }),
  ]}
  extra="Host must be at least 18 years old"
>
  <DatePicker
    style={{ width: '100%' }}
    disabledDate={(current) =>
      current && current > moment().subtract(18, 'years').endOf('day')
    }
    onFocus={() =>
      message.info('⚠️ Host must be at least 18 years old to register.')
    }
  />
</Form.Item>


          <Form.Item
            name="eventCategory"
            label="Event Category"
            rules={[{ required: true, message: 'Please select an event category' }]}
          >
            <Select placeholder="Select event category">
              <Option value="music">Music</Option>
              <Option value="business">Business</Option>
              <Option value="educational">Educational</Option>
              <Option value="sports">Sports</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="password"
            label={
              <span>
                Password&nbsp;
                <Tooltip
                  title={
                    <>
                      • At least 8 characters<br />
                      • 1 uppercase (A-Z), 1 lowercase (a-z)<br />
                      • 1 number (0-9), 1 special character (!@#$...)
                    </>
                  }
                >
                  <InfoCircleOutlined />
                </Tooltip>
              </span>
            }
            rules={[
              { required: true, message: 'Password is required' },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                message: 'Password must meet the requirements (A-Z, a-z, 0-9, special character, min 8 chars)',
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Please confirm your password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const password = getFieldValue('password');
                  if (!value || password === value) {
                    return Promise.resolve();
                  }
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
