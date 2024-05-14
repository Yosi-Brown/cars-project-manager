import React from 'react'

function ProductInput({ ...props }) {
  return (
    <div className="mb-5">
      <label htmlFor={props.htmlFor}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {props.name}
      </label>
      <input type={props.type}
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
        onChange={(e) => props.onChange(e)}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
    </div>
  )
}


export default ProductInput