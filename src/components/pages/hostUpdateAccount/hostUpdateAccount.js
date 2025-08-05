import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, DatePicker, message, Card } from 'antd';
import axios from 'axios';
import moment from 'moment';
import './HostUpdateAccount.css'
import logo from '../../../assets/logo.svg';

const { Option } = Select;

const HostUpdate = () => {
  const [form] = Form.useForm();
  const [host, setHost] = useState(null);

  useEffect(() => {
    const storedHost = JSON.parse(localStorage.getItem('host'));
    if (storedHost) {
      setHost(storedHost);
      form.setFieldsValue({
        ...storedHost,
        dateOfBirth: storedHost.dateOfBirth ? moment(storedHost.dateOfBirth) : null,
      });
    }
  }, [form]);

  const onFinish = async (values) => {
    try {
      const payload = {
        ...values,
        dateOfBirth: values.dateOfBirth ? values.dateOfBirth.format('YYYY-MM-DD') : null,
      };

      const res = await axios.put(`http://localhost:8080/api/hosts/${host.id}`, payload);
      message.success('Host account updated successfully!');
      localStorage.setItem('host', JSON.stringify(res.data));
    } catch (error) {
      console.error(error);
      message.error('Failed to update host account.');
    }
  };

  return (
    <div className="update-account-container">
      {/* Branding / Description */}
      <div className="update-account-left">
        <h1>Update Your Host Profile</h1>
        <p>
          Keeping your information current helps guests find and trust your events.
          Update your name, category, and contact details easily.
        </p>
        <img src={logo} alt="Host Update" className="update-image" />
      </div>

      {/* Host Update Form */}
      <div className="update-account-right">
        <Card
          title="Update Host Details"
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

            <Form.Item name="mobileNumber" label="Mobile Number" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item name="dateOfBirth" label="Date of Birth" rules={[{ required: true }]}>
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item name="eventCategory" label="Event Category" rules={[{ required: true }]}>
              <Select placeholder="Select category">
                <Option value="music">Music</Option>
                <Option value="business">Business</Option>
                <Option value="educational">Educational</Option>
                <Option value="sports">Sports</Option>
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

export default HostUpdate;
