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
import { AuthContext } from './contexts/AuthContext'
import { useContext } from "react";
import SignUp from "./components/SignUp/SignUp";
import AddProduct from "./components/product/AddProduct";

const Root = ({ isAuth }) => {
  <>
  { isAuth && <NavBar /> }
  <Outlet />
  </>
}
// function App() {
// const { isAuth } = useContext(AuthContext)

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<Root isAuth={isAuth} />}>
//   )
// )


//   return (
//     <>
//     <NavBar />
//     <Form />
//     </>
//   )
// }

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

        {/* Private Routes */}
        <Route element={isAuth ? <Outlet /> : <Navigate to={"login"} />}>
          <Route path="/Dashboard" element={<Dashboard />} />
          {/* <Route path="products" element={<Products />} /> */}
        </Route>
      </Route>
    )
  );
  return (
    <>
{/* <ProductImg /> */}
    <AddProduct />
      {/* <RouterProvider router={router} /> */}
      {/* <SignUp/> */}
      {/* <Form /> */}
    </>
  );
}




export default App





