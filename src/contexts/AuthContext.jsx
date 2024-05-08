import { createContext, useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import Dashboard from "../components/pages/privatePages/Dashboard";
const url = 'http://localhost:3000/users'

export const AuthContext = createContext();


function AuthProvider({ children }) {
  
  const [ isAuth, setIsAuth ] = useState(false)

  async function authUser() {
    try {
      const {data} = await axios.get(`${url}/auth`, { withCredentials: true })
      // if(data.success){ 
        setIsAuth(true)
      // if(data.success){
      
      console.log(isAuth)
      // }
      
    } catch (error) {
      console.log('blabla')
      // if(!error.response.data.success) setIsAuth(false)
    }
  }
  useEffect(() => {
    authUser()
  }, [])

  const value = {
    authUser,
    isAuth,
    setIsAuth
  }
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;