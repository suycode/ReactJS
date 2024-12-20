import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "./axios";
import LayoutAdmin from "./Layout/LayoutAdmin";

import Cart from "./Pages/Cart";
import Pay from "./Pages/Pay";
import LayoutPage from "./Layout/LayoutPage";
import Product from "./Pages/Product";
import DetailProduct from "./Pages/DetailProduct";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import AddProduct from "./Admin/Product/AddProduct";
import EditProduct from "./Admin/Product/EditProduct";
import ListCategory from "./Admin/Category/ListCategory";
import AddCategory from "./Admin/Category/AddCategory";
import EditCategory from "./Admin/Category/EditCategory";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/products");
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      {/* <Routes>
        <Route path="/" element={<LayoutAdmin />}>
          <Route index element={<Home data={products} />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/detailad" element={<DetailAd />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/add" element={<Add />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/pay" element={<Pay />} />
        </Route>
      </Routes> */}
      <Routes>
        <Route path="/" element={<LayoutPage />}>
          <Route index element={<HomePage />} />
          <Route path="product" element={<Product />} />
          <Route path="detail-product" element={<DetailProduct />} />
          <Route path="signup" element={<Signup />} />
          <Route path="signin" element={<Signin />} />
          <Route path="cart" element={<Cart />} />
          <Route path="/pay" element={<Pay />} />
        </Route>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<HomeAdmin />} />
          <Route path="product/add" element={<AddProduct />} />
          <Route path="list-product" element={<ListProduct />} />
          <Route path="product/edit/:id" element={<EditProduct />} />
          <Route path="listcate" element={<ListCategory />} />
          <Route path="cate/add" element={<AddCategory />} />
          <Route path="cate/edit/:id" element={<EditCategory />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
