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
import Table from "./components/product/productTable/Table";
import RegisterForm from "./components/registerUser/RegisterForm";
import { AuthContext } from './contexts/AuthContext'
import { useContext } from "react";
import Products from "./components/product/AddProduct";

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
          <Route path="/allProducts" element={<Table />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/addproducts" element={<Products />} />
        </Route>
      </Route>
    )
  );
  return (
    <>
    {/* <Products /> */}
      <RouterProvider router={router} />
    </>
  );
}

export default App