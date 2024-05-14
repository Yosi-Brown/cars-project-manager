import React from 'react'
import Input from './Input'
import axios from 'axios'
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';


const url = 'http://localhost:3000/users'

function Form() {
  // const [values, setValues] = useState("null");

  const initialValues = {
    email: '',
    password: ''
  }


  async function login(value) {
    try {
     const { data } = await axios.post(`${url}/login`, value, {withCredentials:true})
      // console.log('successfully to send post request')
      
      console.log(data)
    } catch (error) {
      console.log(value)
      console.log(error)
    }
  }

  return (
    <Formik
      validationSchema={Yup.object({
        email: Yup.string().email().required('must be email'),
        password: Yup.string().required('must be password'),


      })}
      initialValues={initialValues}
      onSubmit={(value, action) => {
        // console.log(value)
        login(value)
        action.resetForm()
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
                <Input
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