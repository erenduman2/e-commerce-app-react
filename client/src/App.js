import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar";
import Signin from "./pages/Auth/Signin";
import Signup from "./pages/Auth/Signup";
import Products from "./pages/Products"
import ProductDetail from "./pages/ProductDetail"
import ProtectedRouteForProfile from "./pages/ProtectedRouteForProfile"
import ProtectedRouteForAdmin from "./pages/ProtectedRouteForAdmin"
// 
import {
  BrowserRouter as Router, 
  Routes, 
  Route, 
  NavLink
} from "react-router-dom";
import Profile from './pages/Profile';
import Basket from './pages/Basket';
import Error404 from './pages/Error404';
import Admin from './pages/Admin';
import AdminHome from "./pages/Admin/Home";
import AdminProducts from "./pages/Admin/Products/index";
import AdminOrders from "./pages/Admin/Orders";
import AdminProductDetail from "./pages/Admin/ProductDetail";
import AdminNewProduct from "./pages/Admin/Products/new";

function App() {
  return (
    <Router>
    <Navbar/>

      <div id='content'>
        <Routes>
          <Route path="/" element={<Products/>} />
          <Route path="/product/:product_id" element={<ProductDetail/>} />
          <Route path="/login" element={<Signin/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/basket" element={<Basket/>} />
          <Route element={<ProtectedRouteForProfile/>} >
            <Route path="/profile" element={<Profile/>}></Route>
          </Route>
          <Route element={<ProtectedRouteForAdmin/>} >
            <Route path="/admin" admin={true} element={<Admin/>} ></Route>
            <Route path='/admin/' element={<AdminHome/>}/>
            <Route path='/admin/orders' element={<AdminOrders/>}/>
            <Route path='/admin/products' element={<AdminProducts/>}/>
            <Route path='/admin/products/:product_id' element={<AdminProductDetail/>}/>
            <Route path='/admin/products/new' element={<AdminNewProduct/>}/>
          </Route>
          <Route path='*' element={<Error404/>} />
        </Routes>
      </div>
    </Router>
  );
}

function Hme() {
  return <h2>home</h2>
}

export default App;
