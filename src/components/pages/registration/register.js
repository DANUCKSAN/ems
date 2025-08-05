// src/components/pages/registration/register.js
import React from "react";
import { Button, Checkbox, Form, Input, Select, message } from "antd";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // 💡 Include this new CSS file
import logo from "../../../assets/logo.svg"; // ✅ Adjust path if different

const { Option } = Select;

const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { confirm, ...dataToSend } = values;

    try {
      const response = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        message.success("🎉 Registration successful!");
        form.resetFields();
        setTimeout(() => navigate("/login"), 1000);
      } else {
        const errorData = await response.json();
        if (errorData.message?.includes("Email already in use")) {
          message.error("❗ This email is already registered.");
        } else {
          message.error("Registration failed: " + (errorData.message || "Unknown error"));
        }
      }
    } catch (error) {
      message.error("⚠️ Server error: " + error.message);
    }
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle initialValue="61">
      <Select style={{ width: 70 }}>
        <Option value="61">+61</Option>
        <Option value="64">+64</Option>
        <Option value="94">+94</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div className="register-container">
      <div className="register-left">
        <img src={logo} alt="Logo" className="register-logo" />
        <h2>Welcome to EventHub</h2>
        <p>Create your free account and explore hundreds of exciting events tailored for you.</p>
      </div>

      <div className="register-form-container">
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
          layout="vertical"
        >
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: "Please input your first name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: "Please input your last name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              { type: "email", message: "Invalid email format" },
              { required: true, message: "Please input your email!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="nickname"
            label="Nickname"
            tooltip="What do you want others to call you?"
            rules={[
              { required: true, message: "Please input your nickname!", whitespace: true },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[{ required: true, message: "Please input your phone number!" }]}
          >
            <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Please select gender!" }]}
          >
            <Select placeholder="Select your gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("You must accept the agreement")),
              },
            ]}
          >
            <Checkbox>
              I have read the <a href="#">agreement</a>
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
