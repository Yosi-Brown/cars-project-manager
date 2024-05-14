import { createContext, useEffect, useState } from "react"
import axios from "axios"
import { Navigate, useNavigate } from "react-router-dom";
import Dashboard from "../components/pages/privatePages/Dashboard";
const url = 'http://localhost:3000'

export const AuthContext = createContext();


function AuthProvider({ children }) {

  const [isAuth, setIsAuth] = useState(false)

  async function authUser() {
    try {
      const { data } = await axios.get(`${url}/users/auth`, { withCredentials: true })

      // if(data.success){
        // }
        setIsAuth(true)
        
      } catch (error) {
        
        setIsAuth(false)
        console.log(isAuth)
    }
  }
  useEffect(() => {
    authUser()
  }, [])

  const value = {
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