import { BrowserRouter, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import { Home } from './pages/home/Home';
import { Register } from './pages/register/Register';
import { Login } from './pages/login/Login';
import { ProductView } from './pages/productview/ProductView';
import { Category } from './pages/category/Category';
import { Cart } from './pages/cart/Cart';
import Order from './pages/order/Order';
import Completed from './pages/completed/Completed';
import CaryView from './pages/viewthecart/CaryView';
// import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/register/' element={<Register/>} />
          <Route path='/login/' element={<Login />} />
          <Route path='/categories/'>
              <Route path=':id' element={<Category/>} />
          </Route>
          <Route path='/viewproduct/'>
              <Route path=':id' element={<ProductView/>} />
          </Route>
          <Route path='/viewcart/' element={<Cart/>} />
          <Route path='/myorders/' element={<Order/>} />
          <Route path='/completed/' element={<Completed/>} />
          <Route path='/cartview/'>
              <Route path=':id' element={<CaryView/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
