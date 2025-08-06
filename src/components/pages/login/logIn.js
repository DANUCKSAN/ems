// src/pages/Login.js
import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Login.css';

import logoImage from '../../../assets/logo.svg';

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        // Try to parse backend error message JSON
        let errorMessage = 'Invalid email or password';
        try {
          const errorData = await response.json();
          if (errorData.message) errorMessage = errorData.message;
        } catch {
          // Ignore parse errors
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      localStorage.setItem('user', JSON.stringify(data));
      window.dispatchEvent(new Event('storage'));
      message.success('Login successful!');

      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      console.error('Login failed:', error.message);
      message.error(String(error.message) || 'Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img src={logoImage} alt="Logo" className="login-logo" />
        <h1>Welcome to EMS</h1>
        <p>
          Event Management System to simplify client bookings and host event creation. Fast, Secure and Modern.
        </p>
      </div>
      <div className="login-right">
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          className="login-form"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Checkbox name="remember">Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Log in
            </Button>
            <div style={{ marginTop: 12, textAlign: 'center' }}>
              or <a href="/register">Register now!</a>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
