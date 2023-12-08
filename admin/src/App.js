import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/home/Home';
import { AddProduct } from './pages/addproduct/AddProduct';
import { Addpage } from './pages/addpage/Addpage';
import { Barcode } from './pages/barcode/Barcode';
import { Login } from './pages/login/Login';
import { Order } from './pages/order/Order';
import { PreviewProduct } from './pages/previewproducts/PreviewProduct';
import MyOrder from './pages/order/MyOrder';
import CartView from './pages/cartview/Cartview';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login/' element={<Login/>} />
        <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>} />
            <Route path='/addproduct/' element={<AddProduct/>} />
            <Route path='/addproduct/addpage/'>
              <Route path=':id' element={<Addpage/>} />
            </Route>
            <Route path='/addproduct/scan/' element={<Barcode/>} />
            <Route path='/addproduct/preview/' element={<PreviewProduct/>} />
            <Route path='/orders/' element={<MyOrder/>} />
            <Route path='/orders/single/'>
              <Route path=':id' element={<CartView/>} />
            </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
