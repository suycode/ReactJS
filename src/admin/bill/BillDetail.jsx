import React from "react";
import {  Typography, Image, Skeleton, Table } from "antd";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BookOutlined } from "@ant-design/icons";

const BillDetail = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:3000/products`);
            return response.data.map((product) => ({
                key: product.id,
                ...product,
            }));
        },
    });

    const columns = [
        {
            title: "Tên sản phẩm",
            dataIndex: "name",
            key: "name",
            render: (text) => <a>{text}</a>,
            align: "center",
        },
        {
            title: "Ảnh sản phẩm",
            dataIndex: "imageUrl",
            key: "imageUrl",
            render: (_, item) => {
                return <Image width={60} src={item.imageUrl} />;
            },
            align: "center",
        },
        {
            title: "Giá bán (VNĐ)",
            key: "price",
            dataIndex: "price",
            align: "center",
        },
        {
            title: "Số lượng",
            key: "quantity",
            dataIndex: "quantity",
            align: "center",
        },
        {
            title: <strong>Thành tiền (VNĐ)</strong> ,
            key: "total",
            align: "center",
            render: (_, record) => (
                <Typography.Text strong>
                  {(record.price * record.quantity).toLocaleString()}
                </Typography.Text>
              ),
        },
    ];

    const orderInfo = {
        customerName: "Nguyễn Huy Quang",
        phoneNumber: "023456789",
        orderDate: "2024-12-30 10:30",
        address: "123 Đường ABC, Quận 1, TP.HCM",
        status: "Đã xác nhận",
    };

    return (
        <>
            <h1 className="page-title">
                <BookOutlined style={{ marginRight: '8px' }} />
                Chi tiết hóa đơn
            </h1>

            <div style={{ marginBottom: "20px", lineHeight: "1.8" }}>
                <p><strong>Tên khách hàng:</strong> {orderInfo.customerName}</p>
                <p><strong>Số điện thoại:</strong> {orderInfo.phoneNumber}</p>
                <p><strong>Thời gian đặt hàng:</strong> {orderInfo.orderDate}</p>
                <p><strong>Địa chỉ giao hàng:</strong> {orderInfo.address}</p>
                <p><strong>Tình trạng đơn hàng:</strong> {orderInfo.status}</p>
            </div>

            <Skeleton active loading={isLoading}>
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={{ pageSize: 6 }}
                />
            </Skeleton>
        </>
    );
};

export default BillDetail;
