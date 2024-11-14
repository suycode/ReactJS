import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, Input, InputNumber, notification, Radio, Select, Switch, Upload } from "antd";
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
            <h1 style={{ fontSize: '2rem', color:"blue" }} 
                className="mb-5"><EditOutlined 
                style={{ marginRight: '8px' }} />
                Cập nhật sản phẩm
            </h1>
            <Form
                name="basic"
                form={form}
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                style={{maxWidth: 600,  marginLeft:"300px"}}
                onFinish={onFinish}
                disabled={isPending}
            >
                <Form.Item
                    label="Tên sản phẩm"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập tên sản phẩm",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Giá sản phẩm"
                    name="price"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập giá sản phẩm",
                        },
                        {
                            type: "number",
                            min: 0,
                            message: "Không được để số âm",
                        },
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
                <Form.Item label="Ảnh sản phẩm" valuePropName="fileList" getValueFromEvent={normFile}>
                    <Upload
                        action="https://api.cloudinary.com/v1_1/dzpr0epks/image/upload"
                        listType="picture-card"
                        data={{upload_preset: "quangOsuy"}}
                        onChange={onHandleChange}
                    >
                        <button
                            style={{border: 0, background: "none"}}
                            type="button"
                        >
                            <PlusOutlined />
                            <div style={{marginTop: 8}}>
                                Tải ảnh lên
                            </div>
                        </button>
                    </Upload>
                </Form.Item>
                <Form.Item label="Tình trạng" name="available" valuePropName="checked">
                    <Switch style={{background: "blue"}}/>
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
                        background: "blue",
                        padding: '10px 20px', 
                        fontSize: '16px', 
                        marginTop:"20px", 
                        marginLeft:"300px" 
                    }}>
                        Cập nhật
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Edit;
