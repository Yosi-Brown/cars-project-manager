import { createContext, useEffect, useState } from "react"
import axios from "axios"
import { Navigate } from "react-router-dom";

const url = 'http://localhost:3000'

export const AuthContext = createContext();


function AuthProvider({ children }) {

  const [isAuth, setIsAuth] = useState(false)

  async function authUser() {
    try {
      const { data } = await axios.get(`${url}/users/auth`, { withCredentials: true })

      if(data.success){
        setIsAuth(true)
        // Navigate('/dashboard')
        }
        // console.log(isAuth)
        // console.log(data.success)
      } catch (error) {
        console.log(error)
        setIsAuth(false)
        // console.log(error.response.data)
    }
  }

  async function login(value) {
    try {
      // const { isAuth, setIsAuth } = useContext(AuthContext);
     const { data } = await axios.post(`${url}/users/login`, value, {withCredentials:true})
        // console.log(data.success)
      if(data.success){
        setIsAuth(true)
        // console.log(isAuth)
        // navigate('/dashboard')
      }
    } catch (error) {
      setIsAuth(false)
      console.log(value)
      console.log(error)
    }
  }
  
  useEffect(() => {
    authUser()
    // console.log(isAuth)
  }, [])

  const value = {
    isAuth,
    setIsAuth,
    login
  }
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;