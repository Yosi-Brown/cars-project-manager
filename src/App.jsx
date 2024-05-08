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
import { AuthContext } from './contexts/AuthContext'
import { useContext } from "react";

const Root = ({ isAuth }) => {
  {isAuth && <NavBar />}
  <Outlet />
}
function App() {
  // const { isAuth } = useContext(AuthContext)

  // const router = createBrowserRouter(
  //   createRoutesFromElements(
  //     <Route path="/" element={<Root isAuth={isAuth} />}>
  //   )
  // )


  return (
    <>
    <NavBar />
    <Form />
    </>
  )
}

export default App
