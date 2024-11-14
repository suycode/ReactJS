import React, { useState } from "react";
import { Button, Form, Input, InputNumber, notification, Radio, Select, Switch, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const Add = () => {
    const [imageUrl, setImageUrl] = useState("");
    const [form] = Form.useForm();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate, isPending } = useMutation({
        mutationFn: async (product) => {
            return await axios.post(`http://localhost:3000/products`, product);
        },
        onSuccess: () => {
            form.resetFields();
            notification.success({
                message: "Thêm sản phẩm thành công!",
                description: "Sản phẩm mới đã được thêm vào danh sách.",
            });
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
            navigate("/admin");
        },
    });

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const onHandleChange = (info) => {
        if (info.file.status === "done") {
            setImageUrl(info.file.response.secure_url);
        }
    };

    const onFinish = (values) => {
        mutate({ ...values, imageUrl });
    };

    return (
        <div>
            <h1 style={{ fontSize: '2rem', color:"#52c41a" }} 
                className="mb-5">
                <PlusOutlined style={{ marginRight: '8px' }} />
                Thêm sản phẩm mới
            </h1>
            <Form
                name="basic"
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600, marginLeft:"300px" }}
                onFinish={onFinish}
                disabled={isPending}
            >
                <Form.Item
                    label="Tên sản phẩm"
                    name="name"
                    rules={[
                        { required: true, message: "Vui lòng nhập tên sản phẩm" },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Giá sản phẩm"
                    name="price"
                    rules={[
                        { required: true, message: "Vui lòng nhập giá sản phẩm" },
                        { type: "number", min: 0, message: "Không được để số âm" },
                    ]}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    label="Số lượng sản phẩm"
                    name="quantity"
                    rules={[
                        { required: true, message: "Vui lòng nhập số lượng sản phẩm" },
                        { type: "number", min: 1, message: "Số lượng phải lớn hơn hoặc bằng 1" },
                    ]}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    label="Ảnh sản phẩm"
                    name="imageUrl"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    rules={[
                        {
                            validator: (_, value) =>
                            imageUrl ? Promise.resolve() : Promise.reject("Vui lòng tải lên ảnh sản phẩm"),
                        },
                    ]}
                >
                    <Upload
                        action="https://api.cloudinary.com/v1_1/dzpr0epks/image/upload"
                        listType="picture-card"
                        data={{
                            upload_preset: "quangOsuy",
                        }}
                        onChange={onHandleChange}
                    >
                        <button
                            style={{
                                border: 0,
                                background: "none",
                            }}
                            type="button"
                        >
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
                        </button>
                    </Upload>
                </Form.Item>
                <Form.Item label="Tình trạng" name="available" valuePropName="checked">
                    <Switch style={{background: "#52c41a"}}/>
                </Form.Item>
                <Form.Item label="Loại hàng" name="type">
                    <Radio.Group>
                        <Radio value="type1">Hàng cũ</Radio>
                        <Radio value="type2">Hàng mới</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Danh mục" name="category">
                    <Select>
                        <Select.Option value="idCategory1">Điện thoại</Select.Option>
                        <Select.Option value="idCategory2">Máy tính</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Mô tả sản phẩm" name="description">
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" 
                    htmlType="submit" 
                    size="large" 
                    style={{ 
                        backgroundColor:"#52c41a", 
                        padding: '10px 20px', 
                        fontSize: '16px', 
                        marginTop:"20px", 
                        marginLeft:"300px" 
                    }}>
                        Thêm
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Add;
