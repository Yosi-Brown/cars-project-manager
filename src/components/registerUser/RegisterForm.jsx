import React, { useContext, useEffect } from 'react';
import InputRegister from './InputRegister';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';


function RegisterForm({ user = null }) {
  console.log(user)
  const userData = user || {};
  const initialValues = {
    firstName: userData.firstName || '',
    lastName: userData.lastName || '',
    email: userData.email || '',
    password: '',
    confirmPassword: '',
    phone: userData.phone || '',
    address: userData.address || ''
  };

  const { isAuth, signUp } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth && !user) navigate("/dashboard");
  }, [isAuth, navigate, user]);

  return (
    <Formik
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: user ? Yup.string() : Yup.string().required('Required'),
        confirmPassword: user ? Yup.string() : Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Required'),
        phone: Yup.string()
          .matches(/^(\+972|0)?[5-9]\d{8}$/, 'Invalid Israeli phone number')
          .required('Required'),
        address: Yup.string().required('Required')
      })}
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        console.log(values)
        signUp(values);
        actions.resetForm();
      }}
    >
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <FormikForm className="space-y-4 md:space-y-6" action="#">
                <InputRegister
                  label='First Name'
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="Enter your first name"
                />
                <InputRegister
                  label='Last Name'
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Enter your last name"
                />
                <InputRegister
                  label='Email'
                  type="email"
                  name="email"
                  id="email"
                  placeholder="name@company.com"
                />
                {!user && (
                  <>
                    <InputRegister
                      label='Password'
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                    />
                    <InputRegister
                      label='Confirm Password'
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder="Confirm your password"
                    />
                  </>
                )}
                <InputRegister
                  label="Phone"
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="Enter your phone number"
                />
                <InputRegister
                  label='Address'
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Enter your address"
                />
               {!user && <div className="flex items-center justify-between">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit">
                    Sign Up
                  </button>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={() => navigate('/login')}>
                    Log In
                  </button>
                  <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                    Forgot Password?
                  </a>
                </div>}
              </FormikForm>
            </div>
          </div>
        </div>
      </section>
    </Formik>
  );
}

export default RegisterForm;