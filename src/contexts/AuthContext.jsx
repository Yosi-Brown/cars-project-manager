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
     const { data } = await axios.post(`${url}/users/login`, value, {withCredentials:true})
      if(data.success){
        setIsAuth(true)
      }
    } catch (error) {
      setIsAuth(false)
      console.log(value)
      console.log(error)
    }
  }
  async function signUp(value) {
    try {
     const { data } = await axios.post(`${url}/users/register`, value, {withCredentials:true})
      if(data.success){
        console.log(data.success)
      }
    } catch (error) {
      console.log(value)
      console.log(error)
    }
  }

  async function logOut(){
    try {
      const { data } = await axios.get(`${url}/users/logout`, {withCredentials: true})
      if(data.success){
        // console.log('logingout')
        setIsAuth(false)
      }
      
    } catch (error) {
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
    login,
    logOut,
    signUp
  }
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;