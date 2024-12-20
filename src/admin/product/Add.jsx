import React from "react";
import { Button, Form, Input, InputNumber, Select, Upload, Row, Col } from "antd";
import TextArea from "antd/es/input/TextArea";
import { PlusOutlined } from "@ant-design/icons";
import './add.css';  

const Add = () => {
    return (
        <div>
            <h1 className="mb-5">
                <PlusOutlined style={{ marginRight: '8px' }} />
                Thêm sản phẩm mới
            </h1>
            <Form
                name="basic"
                labelCol={{ span: 24 }} 
                wrapperCol={{ span: 24 }} 
                labelAlign="top" 
            >
                <Row gutter={24}>
                    <Col span={12} className="col-item">
                        <Form.Item
                            label="Tên sản phẩm"
                            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
                        >
                            <Input className="input-item"/>
                        </Form.Item>

                        <Form.Item
                            label="Giá sản phẩm"
                            rules={[
                                { required: true, message: "Vui lòng nhập giá sản phẩm" }, 
                                { type: "number", min: 0, message: "Không được để số âm" }
                            ]}
                        >
                            <InputNumber className="input-item" />
                        </Form.Item>

                        <Form.Item
                            label="Số lượng sản phẩm"
                            rules={[
                                { required: true, message: "Vui lòng nhập số lượng sản phẩm" }, 
                                { type: "number", min: 1, message: "Số lượng phải lớn hơn hoặc bằng 1" }
                            ]}
                        >
                            <InputNumber className="input-item" />
                        </Form.Item>

                        <Form.Item label="Danh mục" name="category">
                            <Select className="input-item">
                                <Select.Option>Điện thoại</Select.Option>
                                <Select.Option>Máy tính</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={12} className="col-item">
                        <Form.Item
                            label="Ảnh sản phẩm"
                            valuePropName="fileList"
                            rules={[{ required: true, message: "Vui lòng tải lên ít nhất một ảnh sản phẩm" }]}
                        >
                            <Upload
                                listType="picture-card"
                                multiple
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
                        <Form.Item label="Mô tả sản phẩm" name="description">
                            <TextArea rows={8} className="input-item" />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        className="btn-item"
                    >
                        Thêm
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Add;
