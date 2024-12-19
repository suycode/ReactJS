import './App.css'
import { Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from './axios'
import LayoutAdmin from './layout/LayoutAdmin'
import Admin from './admin/Admin'
import Add from './admin/Add'
import Edit from './admin/Edit'
import Register from './admin/Register'
import Login from './admin/Login'
import DetailAd from './admin/DetailAd'
import Home from './pages/Home'
import Detail from './pages/Detail'
import Cart from './pages/Cart'
import Pay from './pages/Pay'

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
      <Routes>
        <Route path="/" element={<LayoutAdmin/>}>
          <Route index element={<Home data={products}/>}/>
          <Route path="/detail" element={<Detail/>}/>
          <Route path="/detailad" element={<DetailAd/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/add" element={<Add/>}/>
          <Route path="/edit" element={<Edit/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/pay" element={<Pay/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
