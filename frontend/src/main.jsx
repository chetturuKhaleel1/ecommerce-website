// main.jsx or index.jsx
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx'; // Main layout or wrapper
import AdminRoute from './pages/Admin/AdminRoute';
// React Router imports
import { Route, RouterProvider, createRoutesFromElements } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';

// Redux store provider
import { Provider } from 'react-redux';
import store from './redux/store';


// Components and pages
import PrivateRoute from './components/PrivateRoute'; // Route guard component
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Profile from './pages/User/Profile';
import UserList from './pages/Admin/UserList.jsx';
import CategoryList from './pages/Admin/CategoryList.jsx';
import ProductList from "./pages/Admin/ProductList";
import AllProducts from './pages/Admin/AllProducts.jsx';
import ProductUpdate from './pages/Admin/ProductUpdate.jsx'
import Home from './pages/Home.jsx';
import Favorites from './pages/Products/Favorites.jsx';
import ProductDetails from './pages/Products/ProductDetails.jsx';
import Cart from './pages/Cart.jsx';

import Shop from './pages/Shop.jsx';
import Shipping from './pages/Orders/Shipping.jsx';
import PlaceOrder from './pages/Orders/PlaceOrder.jsx';


import Order from './pages/Orders/Order.jsx';
import UserOrder from './pages/User/UserOrder.jsx';
import OrderList from './pages/Admin/OrderList.jsx';
import AdminDashboard from './pages/Admin/AdminDashboard.jsx';

// Create routes using React Router's createBrowserRouter
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}> {/* Root app layout */}
            {/* 🌐 Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
<Route index={true}  path="/" element={<Home/>}/>
<Route path='/favorite' element={<Favorites/>}/>
<Route path='/product/:id' element={<ProductDetails/>} />
<Route path='/cart' element={<Cart/>}/>
<Route path='/shop' element={<Shop/>}/>
<Route path='/user-orders' element={<UserOrder/>}/>







      {/* 🔐 Protected routes go here */}
      <Route path="" element={<PrivateRoute />}>
        {/* ✅ Correct path spelling for /profile */}
        <Route path="/profile" element={<Profile />} />
{/* shipping */}
 <Route path="/shipping" element={<Shipping />} />
      </Route>
{/* placeholder */}
<Route path='/placeorder' element={<PlaceOrder/>}/>

{/* specifi order */}

<Route path='/order/:id' element={<Order/>}/>
     {/* admin routes */}

<Route path='/admin' element={<AdminRoute/>}>


<Route path='userlist' element={<UserList/>} />

<Route path='categorylist' element={<CategoryList/>} />
<Route path='productlist/:pageNumber' element={<ProductList/>}/>
 <Route path="productlist" element={<ProductList />} />
<Route path='allproductslist' element={<AllProducts/>}/>
<Route path='orderlist' element={<OrderList/>}/>
 <Route path="product/update/:_id" element={<ProductUpdate />} />
 <Route path='dashboard' element={<AdminDashboard/>}/>

</Route>




    </Route>
  )
);

// Render the app with Redux store and router
createRoot(document.getElementById('root')).render(
   <Provider store={store}>
   <RouterProvider router={router} />
  </Provider>
);




