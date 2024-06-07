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
import Users from "./components/pages/privatePages/Users";
import Products from "./components/pages/privatePages/Products";
import Orders from "./components/pages/privatePages/Orders"
import SignUp from "./components/pages/publicPages/SignUp";

const Root = ({ isAuth }) => {
  return <>
    {isAuth && <NavBar />}
    <Outlet />
  </>
}

function App() {
  // const { sendGet, setSendGet } = useContext(GlobalContext);
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
        <Route path="/signUp" element={<SignUp />} />


        {/* Private Routes */}
        <Route element={isAuth ? <Outlet /> : <Navigate to={"login"} />}>
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          {/* <Route path="/add-product" element={<AddProduct />} /> */}
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

export default App;