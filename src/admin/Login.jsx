import React from "react";
import { Button, Form, Input } from "antd";
import { FormOutlined } from "@ant-design/icons";

const Login = () => {
    return (
      <div>
        <h1 style={{color:'blue'}}>
          <FormOutlined className="icon-spacing" />
          Đăng nhập
        </h1>
          <Form
            name="register"
            className="register-form"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            <Form.Item
              label="Tên đăng nhập"
              name="username"
              rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập" }]}
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
                className="register-button"
                style={{backgroundColor:'blue'}}
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
      </div>
  );
};

export default Login;
