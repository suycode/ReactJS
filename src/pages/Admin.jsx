import React from "react";
import { Button, Image, notification, Popconfirm, Skeleton, Space, Table } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { BookOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";

const Admin = () => {
    const queryClient = useQueryClient();
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

    const { mutate } = useMutation({
        mutationFn: async (id) => {
            return await axios.delete(`http://localhost:3000/products/${id}`);
        },
        onSuccess: () => {
            notification.success({
                message: "Xóa sản phẩm thành công!",
                description: "Sản phẩm đã được xóa khỏi danh sách.",
            });
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
        },
        onError: (error) => {
            notification.error({
                message: "Xóa sản phẩm thất bại!",
                description: `Đã xảy ra lỗi: ${error.message}`,
            });
        },
    });
    
    const onDelete = (id) => {
        mutate(id);
    };

    const columns = [
        {
            title: "Ảnh",
            dataIndex: "imageUrl",
            key: "imageUrl",
            render: (_, item) => {
                return <Image width={100} src={item.imageUrl} />;
            },
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "name",
            key: "name",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Giá (VNĐ)",
            key: "price",
            dataIndex: "price",
        },
        {
            title: "Số lượng",
            key: "quantity",
            dataIndex: "quantity",
        },
        {
            title: "Tình trạng",
            dataIndex: "available",
            key: "available",
            render: (_, item) => {
                return <span>{item.available ? "Còn hàng" : "Hết hàng"}</span>;
            },
        },
        {
            title: "Loại hàng",
            key: "type",
            dataIndex: "type",
            render: (_, item) => {
                return <span>{item.type === "type1" ? "Hàng cũ" : "Hàng mới"}</span>;
            },
        },
        {
            title: "Danh mục",
            dataIndex: "category",
            key: "category",
            render: (_, item) => {
                return <span>{item.category === "idCategory1" ? "Điện thoại" : "Máy tính"}</span>;
            },
        },
        {
            title: "Mô tả sản phẩm",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Thao tác",
            key: "action",
            render: (_, item) => (
                <Space width="150">
                    <Link to={`/edit/${item.id}`}>
                        <Button type="primary" icon={<EditOutlined />}>
                            Cập nhật
                        </Button>
                    </Link>

                    <Popconfirm 
                        title="Xóa sản phẩm"
                        description="Bạn chắc chắn muốn xóa sản phẩm này không?"
                        onConfirm={() => onDelete(item.id)}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button type="primary" danger icon={<DeleteOutlined />}>
                            Xóa
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            <h1 style={{ fontSize: '2rem', color:"purple" }} className="mb-5">
                <BookOutlined style={{ marginRight: '8px' }} />
                Quản lý sản phẩm
            </h1>
            <Link to="/add">
                <Button 
                    type="primary" 
                    style={{backgroundColor: '#388E3C'}} 
                    icon={<PlusOutlined />}
                >
                    Thêm sản phẩm
                </Button>
            </Link>
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

export default Admin;
