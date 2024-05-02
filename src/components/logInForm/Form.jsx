import React from 'react'
import Input from './Input'
import { Formik, Form as FormikForm } from 'formik';



function Form() {
  // const [values, setValues] = useState("null");

  // const initialValues = {
  //   email: '',
  //   password: ''
  // }


  return (
<Formik

      // initialValues={initialValues}
      onSubmit={(value,action) => {
        console.log(value)
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
                  Sign In
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