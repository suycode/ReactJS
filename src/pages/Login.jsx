import React from "react";
import { Button, Form, Input, notification } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: async (formData) => {
      const response = await axios.post(`http://localhost:3000/login`, formData);
      return response.data; 
    },
    onSuccess: (data) => {
      localStorage.setItem("user", JSON.stringify(data)); 
      form.resetFields();

      notification.success({
        message: "Đăng nhập thành công!",
        description: `Chào mừng ${data.username || "user"}!`,
      });

      navigate("/");
    },
    onError: () => {
      notification.error({
        message: "Đăng nhập thất bại",
        description: "Email hoặc mật khẩu không đúng. Vui lòng thử lại.",
      });
    },
  });

  const onFinish = (values) => {
    mutate(values);
  };

  return (
    <div>
      <h1 style={{ fontSize: '2rem', color:"#1890ff" }} 
        className="mb-5">
        <LoginOutlined style={{ marginRight: '8px' }} />
        Đăng nhập
      </h1>
      <Form
        name="login"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, marginLeft:"300px" }}
        onFinish={onFinish}
        disabled={isPending}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email" },
            { type: "email", message: "Email không hợp lệ" }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu" },
            { min: 8, message: "Mật khẩu phải có tối thiểu 8 ký tự" },
          ]}
        >
          <Input.Password />
        </Form.Item>
        
        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            size="large" 
            style={{ 
              backgroundColor:"#1890ff", 
              padding: '10px 20px', 
              fontSize: '16px', 
              marginTop:"20px", 
              marginLeft:"300px" 
            }}
          >
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
