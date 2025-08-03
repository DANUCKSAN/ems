import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, Select, message } from 'antd';
import moment from 'moment';

const { Option } = Select;

const HostRegister = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);

    // Prepare payload with formatted dateOfBirth
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

      message.success('Registration successful! You can now login.');
    } catch (error) {
      message.error(`Registration failed: ${error.message}`);
    }

    setLoading(false);
  };

  // Disable dates if under 18
  const disabledDate = (current) => {
    return current && current > moment().subtract(18, 'years').endOf('day');
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', padding: 24, background: '#fff', borderRadius: 8 }}>
      <h2>Host Registration</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[{ required: true, message: 'Please input your first name' }]}
        >
          <Input placeholder="First Name" />
        </Form.Item>

        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[{ required: true, message: 'Please input your last name' }]}
        >
          <Input placeholder="Last Name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please input your email' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="mobileNumber"
          label="Mobile Number"
          rules={[{ required: true, message: 'Please input your mobile number' }]}
        >
          <Input placeholder="Mobile Number" />
        </Form.Item>

        <Form.Item
          name="dateOfBirth"
          label="Date of Birth"
          rules={[{ required: true, message: 'Please select your date of birth' }]}
        >
          <DatePicker style={{ width: '100%' }} disabledDate={disabledDate} />
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
          label="Password"
          rules={[
            { required: true, message: 'Please input your password' },
            { min: 6, message: 'Password must be minimum 6 characters' },
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
                if (!value || getFieldValue('password') === value) {
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
  );
};

export default HostRegister;
