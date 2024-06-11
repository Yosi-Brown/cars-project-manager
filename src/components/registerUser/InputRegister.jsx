import React from 'react';
import { Field, useField } from 'formik';

const InputRegister = ({ label, ...props }) => {
  const [meta,field] = useField(props);

  return (
    // <div className="mb-4">
    <div>
      <label htmlFor={props.id || props.name}
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {/* className="block text-sm font-medium text-gray-700 dark:text-white"> */}
        {label}
      </label>
      <Field
      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      // className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:dark:bg-gray-700 dark:text-white sm:text-sm"
        {...field}
        {...props}
      />
      {/* {meta.touched && meta.error ? (
        <div className="text-red-500 text-sm">{meta.error}</div>
      ) : null} */}
    </div>
  );
};

export default InputRegister;