import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import './App.css'
import Form from './components/logInForm/Form'
import NavBar from './components/section/NavBar'
import Dashboard from "./components/pages/privatePages/Dashboard";
import ProductTable from "./components/product/productTable/ProductTable";
import RegisterForm from "./components/registerUser/RegisterForm";
import { AuthContext } from './contexts/AuthContext'
import { useContext } from "react";
import AddProduct from "./components/product/AddProduct";
import OrdersTable from "./components/orders/OrdersTable";
import UsersTable from "./components/users/UsersTable";


const Root = ({ isAuth }) => {
  return <>
    {isAuth && <NavBar />}
    <Outlet />
  </>
}

function App() {
  const { isAuth } = useContext(AuthContext);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root isAuth={isAuth} />}>
        {/* public routes */}
        <Route
          index
          element={
            isAuth ? <Navigate to={"/dashboard"} /> : <Navigate to={"/login"} />
          }
        />

        <Route path="/login" element={<Form />} />
        <Route path="/signup" element={<RegisterForm />} />


        {/* Private Routes */}
        <Route element={isAuth ? <Outlet /> : <Navigate to={"login"} />}>
          <Route path="/products" element={<ProductTable />} />
          <Route path="/orders" element={<OrdersTable />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/users" element={<UsersTable />} />
          {/* <Route path="/addproducts" element={<Products />} /> */}
        </Route>
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App


// ***********

// import React, { useContext } from 'react';
// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   RouterProvider,
//   Route,
//   Outlet,
//   Navigate,
// } from 'react-router-dom';
// import './App.css';
// import Form from './components/logInForm/Form';
// import NavBar from './components/section/NavBar';
// import Dashboard from './components/pages/privatePages/Dashboard';
// import Table from './components/product/productTable/Table';
// import RegisterForm from './components/registerUser/RegisterForm';
// import { AuthContext } from './contexts/AuthContext';
// import Products from './components/product/AddProduct';
// import AddProduct from './components/product/AddProduct';

// const Root = ({ isAuth }) => {
//   return (
//     <>
//       {isAuth && <NavBar />}
//       <Outlet />
//     </>
//   );
// };

// function App() {
//   const { isAuth } = useContext(AuthContext);

//   const router = createBrowserRouter(
//     createRoutesFromElements(
//       <Route path="/" element={<Root isAuth={isAuth} />}>
//         {/* public routes */}
//         <Route
//           index
//           element={
//             isAuth ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
//           }
//         />

//         <Route path="/login" element={<Form />} />
//         <Route path="/signup" element={<RegisterForm />} />

//         {/* Private Routes */}
//         <Route element={isAuth ? <Outlet /> : <Navigate to="login" />}>
//           <Route path="/allProducts" element={<Table />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/addproducts" element={<Products />} />
//           <Route path="/addproduct" element={<AddProduct />} />
//         </Route>
//       </Route>
//     )
//   );

//   return (
//     <RouterProvider router={router} />
//   );
// }

// export default App;
