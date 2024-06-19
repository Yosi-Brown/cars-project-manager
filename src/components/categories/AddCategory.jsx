import axios from 'axios';
import React, { useContext } from 'react'
import { toastFire } from '../../utils/Toaster';
import { GlobalContext } from '../../contexts/GlobalContext';


const url_post = `${import.meta.env.VITE_URL}/categories/add`;
const url_put = `${import.meta.env.VITE_URL}/categories/edit`;


function AddCategory({ category = null, onClose }) {

  const { setSendGetRequest } = useContext(GlobalContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const categoryName = document.getElementById('CategoryName').value
    // console.log(categoryName);
    const method = category ? "PUT" : "POST";
    const url = category ? `${url_put}/${category._id}` : url_post;

    // console.log(url);
    try {
      const { data } = await axios({
        method: method,
        url: url,
        data: { categoryName },
        withCredentials: true
      });
      if (data.success) {
        console.log(data)
        toastFire(true, data.message)
        onClose()
      }
    } catch (error) {
      console.log(error)
      toastFire(false, error.response.data.error)
    } finally {
      setSendGetRequest(prev => !prev)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}>
      <div className="mb-5">
        <label htmlFor='category'
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Category Name
        </label>
        <input type='text'
          id='CategoryName'
          name='categoryName'
          placeholder='Enter category name'
          defaultValue={category?.name}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
      </div>
      <button
        type="submit"
        className="mb-1 col-span-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {category ? "Save Changes" : "Add Product"}
      </button>
    </form>
  )
}

export default AddCategory