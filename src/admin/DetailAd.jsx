import React, { useEffect, useState } from "react";
import api from "../axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Descriptions, Row, Col, Image, Button, Modal, notification } from 'antd';
import { EyeOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import './detailAd.css'; 

const DetailAd = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const { data } = await api.get(`/products/${id}`);
                setProduct(data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [id]);

    const onDelete = async () => {
        try {
            await api.delete(`/products/${id}`);
            notification.success({
                message: "Xóa sản phẩm thành công!",
                description: "Sản phẩm đã được xóa khỏi danh sách.",
            });
            navigate("/admin");
        } catch (error) {
            notification.error({
                message: "Có lỗi xảy ra khi xóa sản phẩm!",
                description: `Đã xảy ra lỗi: ${error.message}`,
            });
        }
    };

    const deleteConfirm = () => {
        Modal.confirm({
            title: 'Bạn có chắc chắn muốn xóa sản phẩm này?',
            content: 'Hành động này sẽ không thể phục hồi!',
            okText: 'Có',
            cancelText: 'Không',
            onOk: onDelete,
        });
    };

    return (
        <div>
            <h1 className="mb-5">
                <EyeOutlined style={{ marginRight: '8px' }} />Chi tiết sản phẩm
            </h1>
            <Row gutter={16} align="middle" style={{ textAlign: 'left' }}>
                <Col span={10} className="product-grid">
                    {product.imageUrls && product.imageUrls.length > 0 ? (
                        <div className="grid-container">
                            {product.imageUrls.map((url, index) => (
                                <Image
                                    key={index}
                                    src={url}
                                    alt={`Ảnh sản phẩm ${index + 1}`}
                                    className="grid-item"
                                    preview
                                />
                            ))}
                        </div>
                    ) : product.imageUrl ? (
                        <div className="grid-container">
                            <Image
                                src={product.imageUrl}
                                alt="Ảnh sản phẩm"
                                className="grid-item"
                                preview
                            />
                        </div>
                    ) : (
                        <p>Không có ảnh sản phẩm</p>
                    )}
                </Col>

                <Col span={12}>
                    <Descriptions title="Thông tin sản phẩm" bordered column={1} className="custom-description">
                        <Descriptions.Item label="Tên sản phẩm">
                            {product.name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Giá niêm yết">
                            {product.price} VNĐ
                        </Descriptions.Item>
                        <Descriptions.Item label="Số lượng">
                            {product.quantity}
                        </Descriptions.Item>
                        <Descriptions.Item label="Mô tả">
                            {product.description}
                        </Descriptions.Item>
                    </Descriptions>

                    <Link to='/edit'>
                        <Button 
                            type="primary" 
                            size="large" 
                            icon={<EditOutlined />}
                            style={{ backgroundColor: 'blue', marginTop: '20px' }}
                        >
                            Cập nhật
                        </Button>
                    </Link>

                    <Button 
                        type="primary" 
                        danger
                        size="large" 
                        style={{ marginTop: '20px', marginLeft: '10px' }}
                        icon={<DeleteOutlined />}
                        onClick={deleteConfirm}
                    >
                        Xóa
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

export default DetailAd;


