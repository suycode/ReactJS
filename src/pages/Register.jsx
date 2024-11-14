import React, { useState } from "react";
import { Button, Form, Input, notification } from "antd";
import { FormOutlined } from "@ant-design/icons";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [form] = Form.useForm();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    
    const { mutate, isPending } = useMutation({
        mutationFn: async (user) => {
            return await axios.post(`http://localhost:3000/register`, user);
        },
        onSuccess: () => {
            form.resetFields();
            notification.success({
                message: "Đăng ký thành công!",
                description: "Tài khoản mới đã được tạo.",
            });
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
            navigate("/login");
        },
    });

    const onFinish = (values) => {
        mutate(values);
    };

    return (
        <div>
            <h1 style={{ fontSize: '2rem', color:"#52c41a" }} className="mb-5">
                <FormOutlined style={{ marginRight: '8px' }} />
                Đăng ký tài khoản
            </h1>
            <Form
                name="register"
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600, marginLeft:"300px" }}
                onFinish={onFinish}
                disabled={isPending}
            >
                <Form.Item
                    label="Tên đăng nhập"
                    name="username"
                    rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập" }]}
                >
                    <Input />
                </Form.Item>

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
                            backgroundColor:"#52c41a", 
                            padding: '10px 20px', 
                            fontSize: '16px', 
                            marginTop:"20px", 
                            marginLeft:"300px" 
                        }}
                    >
                        Đăng ký
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Register;
