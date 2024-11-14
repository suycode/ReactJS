import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import { BookOutlined, FormOutlined, HomeOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

const items = [
  {
    key: 'home',
    label: <Link to="/"> <HomeOutlined style={{ marginRight: '8px' }} />Trang chủ</Link>,
  },
  {
    key: 'admin',
    label: <Link to="/admin"><BookOutlined style={{ marginRight: '8px' }} />Thống kê</Link>,
  },
  {
    key: 'register',
    label: <Link to="/register"><FormOutlined style={{ marginRight: '8px' }} />Đăng ký</Link>,
  },
  {
    key: 'login',
    label: <Link to="/login"><UserOutlined style={{ marginRight: '8px' }} />Đăng nhập</Link>,
  },
  {
    key: 'cart',
    label: <Link to="/cart"><ShoppingCartOutlined style={{ marginRight: '8px' }} />Giỏ hàng</Link>,
  },
];

const LayoutAdmin = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  
  return (
    <Layout>
      <Header
        style={{
          position: 'sticky', 
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        
        <Menu
          theme="dark"
          mode="horizontal"
          // defaultSelectedKeys={['home']}
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>
      
      <Content
        style={{
          padding: '0 48px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          {/* <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item> */}
        </Breadcrumb>
        <div
          style={{
            padding: 24,
            minHeight: 550,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </Content>
      
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        {/* Ant Design ©{new Date().getFullYear()} Created by Ant UED */}
        Design by quang0suy
      </Footer>
    </Layout>
  );
};

export default LayoutAdmin;
