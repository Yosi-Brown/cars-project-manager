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
import Navbar from './components/section/Navbar'
import Dashboard from "./components/pages/privatePages/Dashboard";
import { AuthContext } from './contexts/AuthContext'
import { useContext } from "react";
import Users from "./components/pages/privatePages/Users";
import Products from "./components/pages/privatePages/Products";
import Orders from "./components/pages/privatePages/Orders"
import SignUp from "./components/pages/publicPages/SignUp";
import Categories from "./components/pages/privatePages/Categories";
import Profile from "./components/profile/Profile";


const Root = ({ isAuth }) => {
  return <>
    {isAuth && <Navbar />}
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

        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Form />} />


        {/* Private Routes */}
        <Route element={isAuth ? <Outlet /> : <Navigate to={"login"} />}>
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/profile" element={<Profile />} />
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