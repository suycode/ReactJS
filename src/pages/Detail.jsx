import React, { useEffect, useState } from "react";
import api from "../axios";
import { useParams } from "react-router-dom";
import { Descriptions, Row, Col, Image, Button, message } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import './detail.css'; 

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  const handleMinus = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const handlePlus = () => setQuantity((prev) => prev + 1);

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

  const handleAddToCart = () => {
    if (quantity > product.quantity) {
      message.error("Số lượng yêu cầu vượt quá số lượng sản phẩm hiện có!");
    } else {
      const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
      const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
  
      if (existingItemIndex >= 0) {
        cartItems[existingItemIndex].quantity += quantity;
      } else {
        cartItems.push({ ...product, quantity });
      }
  
      localStorage.setItem('cart', JSON.stringify(cartItems));
      message.success("Sản phẩm đã được thêm vào giỏ hàng!");
    }
  };  

  return (
    <div>
      <h1 className="mb-5" style={{ color:'gray'}}>
        <EyeOutlined style={{ marginRight: '8px'}} />Chi tiết sản phẩm
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

          <div className="soluong">
            <button className="minus-btn" onClick={handleMinus}>-</button>
            <input
              type="text"
              name="amount"
              id="amount"
              value={quantity}
              readOnly
            />
            <button className="plus-btn" onClick={handlePlus}>+</button>
          </div>

          <Button 
            type="primary" 
            icon={<ShoppingCartOutlined />}
            size="large"
            onClick={handleAddToCart}
            style={{ backgroundColor: '#E67E22', padding: '10px 20px', fontSize: '16px', marginTop:"20px" }}
          >
            Thêm vào giỏ hàng
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Detail;
