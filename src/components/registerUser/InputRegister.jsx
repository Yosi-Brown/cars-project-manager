import React from 'react';
import { useField } from 'formik';

const InputRegister = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="mb-4">
      <label htmlFor={props.id || props.name} className="block text-sm font-medium text-gray-700 dark:text-white">
        {label}
      </label>
      <input
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:dark:bg-gray-700 dark:text-white sm:text-sm"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-sm">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default InputRegister;