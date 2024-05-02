import { Field } from 'formik'
import React from 'react'

function Input({...props}) {

  return (
    <div>
      <label htmlFor={props.htmlFor}
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Your {props.name}
        </label>
      <Field type={props.type}
      name={props.name}
      id={props.id}
      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder={props.placeholder}
     />
    </div>
  )
}

export default Input