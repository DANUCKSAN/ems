import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link } from 'react-router-dom';

const HostLogin = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async ({ email, password }) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/hosts/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const data = await response.json();
      message.success('Login successful!');
      localStorage.setItem('host', JSON.stringify(data));
      setTimeout(() => {
        window.location.href = '/'; // or `/host-dashboard`
      }, 1000);
    } catch (error) {
      message.error(`Login failed: ${error.message}`);
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        maxWidth: 420,
        margin: '60px auto',
        padding: '32px',
        background: '#fff',
        borderRadius: 12,
        boxShadow: '0 0 12px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
      }}
    >
      <h2 style={{ marginBottom: 24 }}>Host Login</h2>

      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Login
          </Button>
        </Form.Item>
      </Form>

      <div style={{ marginTop: 16 }}>
        <p style={{ marginBottom: 4, color: '#555' }}>Need a host account?</p>
        <Link to="/host-register">
          <Button type="default" block>
            Register as Host
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HostLogin;
