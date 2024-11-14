import './App.css'
import { Route, Routes } from 'react-router-dom'
import Admin from './pages/Admin'
import Add from './pages/Add'
import Edit from './pages/Edit'
import Home from './pages/Home'
import LayoutAdmin from './layout/LayoutAdmin'
import Detail from './pages/Detail'
import { useEffect, useState } from 'react'
import api from './axios'
import Register from './pages/Register'
import Login from './pages/Login'
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
          <Route path="/detail/:id" element={<Detail/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/add" element={<Add/>}/>
          <Route path="/edit/:id" element={<Edit/>}/>
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
