// src/pages/Login.js
import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';

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
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const data = await response.json();
      console.log('Login success:', data);
      localStorage.setItem('user', JSON.stringify(data));
window.dispatchEvent(new Event('storage')); // 🔁 Trigger header update


      message.success('Login successful!');
      localStorage.setItem('user', JSON.stringify(data));

      setTimeout(() => {
        navigate('/'); // Redirect to homepage
      }, 1500);
    } catch (error) {
      console.error('Login failed:', error.message);
      message.error('Failed to login: Wrong credentials');
    }
  };



  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f5f5f5',
      }}
    >
      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{
          maxWidth: 360,
          width: '100%',
          padding: '40px 24px',
          background: 'white',
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
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
  );
};

export default Login;
