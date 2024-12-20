import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Col, Form, Input, InputNumber, notification, Row, Select, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Edit = () => {
    const [imageUrl, setImageUrl] = useState("");
    const [form] = Form.useForm();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { id } = useParams(); 

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await axios.get(`http://localhost:3000/products/${id}`);
            const product = response.data;
            setImageUrl(product.imageUrl);
            form.setFieldsValue(product);
        };
        fetchProduct();
    }, [id, form]);

    const { mutate, isPending } = useMutation({
        mutationFn: async (product) => {
            return await axios.put(`http://localhost:3000/products/${id}`, product);
        },
        onSuccess: () => {
            notification.success({
                message: "Cập nhật sản phẩm thành công!",
                description: "Sản phẩm đã được cập nhật.",
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
        if (!imageUrl) return;
        mutate({ ...values, imageUrl });
    };

    return (
        <div>
            <h1 className="mb-5" style={{color:'blue'}}>
                <EditOutlined style={{ marginRight: '8px' }} />
                Cập nhật sản phẩm
            </h1>
            <Form
                name="basic"
                form={form}
                labelCol={{ span: 24 }} 
                wrapperCol={{ span: 24 }} 
                onFinish={onFinish}
                disabled={isPending}
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
                        style={{backgroundColor:'blue'}}
                    >
                        Cập nhật
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Edit;
