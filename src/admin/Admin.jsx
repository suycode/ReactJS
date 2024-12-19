import React from "react";
import { Button, Image, notification, Skeleton, Space, Table, Modal } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { BookOutlined, PlusOutlined } from "@ant-design/icons";

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

    const deleteConfirm = (id) => {
        Modal.confirm({
            title: 'Bạn có chắc chắn muốn xóa sản phẩm này?',
            content: 'Hành động này sẽ không thể phục hồi!',
            okText: 'Có',
            cancelText: 'Không',
            onOk: () => onDelete(id),
        });
    };

    const Divider = () => (
        <div
            style={{
                height: "20px",
                width: "1.5px",
                backgroundColor: "black",
                margin: "0 8px",
            }}
        />
    );

    const linkStyle = {
        textDecoration: "none",
        fontWeight: "bold",
    };

    const columns = [
        {
            title: "Ảnh",
            dataIndex: "imageUrl",
            key: "imageUrl",
            render: (_, item) => {
                return <Image width={100} src={item.imageUrl} />;
            },
            align: "center",
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "name",
            key: "name",
            render: (text) => <a>{text}</a>,
            align: "center",
        },
        {
            title: "Giá (VNĐ)",
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
            title: "Danh mục",
            dataIndex: "category",
            key: "category",
            render: (_, item) => {
                return <span>{item.category === "idCategory1" ? "Điện thoại" : "Máy tính"}</span>;
            },
            align: "center",
        },
        {
            title: "Thao tác",
            key: "action",
            render: (_, item) => (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Link to='/detailad' style={{ ...linkStyle, color: 'purple' }}>
                        Chi tiết
                    </Link>
                    <Divider />

                    <Link to='/edit' style={{ ...linkStyle, color: 'blue' }}>
                        Cập nhật
                    </Link>
                    <Divider />

                    <span
                        style={{ ...linkStyle, cursor: "pointer", color: "red" }}
                        onClick={() => deleteConfirm(item.id)}
                    >
                        Xóa
                    </span>
                </div>
            ),
            align: "center",
        },
    ];

    return (
        <>
            <h1 style={{ fontSize: '2rem', color: "purple" }} className="mb-5">
                <BookOutlined style={{ marginRight: '8px' }} />
                Quản lý sản phẩm
            </h1>
            <Link to="/add">
                <Button
                    type="primary"
                    style={{ backgroundColor: '#388E3C' }}
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
