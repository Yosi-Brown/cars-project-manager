import React, { useContext, useEffect } from 'react'
import Input from './Input'
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import PasswordInput from './PasswordInput';



function Form() {
  // const [values, setValues] = useState("null");  
  const initialValues = {
    email: '',
    password: ''
  }
  
  const { isAuth , login } = useContext(AuthContext);
  const navigate = useNavigate()

  useEffect(() => {
   if(isAuth) navigate("/dashboard")
  },[isAuth])

  return (
    <Formik
      validationSchema={Yup.object({
        email: Yup.string().email().required('must be email'),
        password: Yup.string().required('must be password'),


      })}
      initialValues={initialValues}
      onSubmit={async(value, action) => {
        // console.log(value)
        const { data } = await login(value) //לא עובד
        if(data.success){
          action.resetForm()
        }
      }}>


      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <FormikForm className="space-y-4 md:space-y-6" action="#">
                <Input
                  htmlFor='email'
                  type="email"
                  name="email"
                  id="email"
                  placeholder="name@company.com"
                />
                <PasswordInput
                  htmlFor='password'
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                />
                <div className="flex items-center justify-between">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit">
                    Log In
                  </button>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="btn"
                    onClick={() => navigate('/signup')}>
                    Sign Up
                  </button>
                  <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                    Forgot Password?
                  </a>
                </div>
              </FormikForm>
            </div>
          </div>
        </div>
      </section>
    </Formik>
  )
}

export default Form