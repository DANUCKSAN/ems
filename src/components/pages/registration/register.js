import React from "react";
import { Button, Checkbox, Form, Input, Select, message } from "antd";

const { Option } = Select;

const Register = () => {
  const [form] = Form.useForm();

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
      } else {
        const errorData = await response.json();
        if (errorData.message && errorData.message.includes("Email already in use")) {
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
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f0f2f5",
        padding: 24,
      }}
    >
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
        style={{
          maxWidth: 600,
          width: "100%",
          padding: 40,
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
        }}
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
                return Promise.reject(
                  new Error("The passwords do not match!")
                );
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
            I have read the <a href="">agreement</a>
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
