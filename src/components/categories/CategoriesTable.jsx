import React, { useContext, useState } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import { AiOutlineEye } from 'react-icons/ai';
import axios from 'axios';
import GlobalModal from '../modals/GlobalModal';
import AddCategory from './AddCategory';


const url = import.meta.env.VITE_URL

function CategoriesTable({ categories, isLoading }) {
  const { setSendGetRequest } = useContext(GlobalContext);
  const [singleCategory, setSingleCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);




  const handleEdit = (bool = false, category = null) => {
    setSingleCategory(category)
    setIsModalOpen(bool)
  }

  const handleDelete = async (id) => {
    try {
      const Confirmation = confirm("Are you sure you want to delete?");
      if (Confirmation) {
        const { data } = await axios.delete(`${url}/categories/delete/${id}`, { withCredentials: true });
        if (data.success) {
          console.log("Category deleted successfully");
          toastFire(true, data.message)
          // setSendGetRequest((prev) => !prev);
        }
      }
    } catch (error) {
      console.log("Error deleting Category:", error)
      toastFire(false, error.response.data.error)
      
    } finally { setSendGetRequest((prev) => !prev); }
  };


  return (
    <>
      {!isLoading && (
        <div className=''>

          <button
            type="button"
            className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-1 mb-3"
            onClick={() => handleEdit(true)}
          >
            Add Category
          </button>
          <button
            type="button"
            className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-3"
            onClick={() => setSendGetRequest((prev) => !prev)}
          >
            Refresh
          </button>

          <div className='p-4 relative flex flex-col items-center justify-center mx-auto overflow-x-auto shadow-md sm:rounded-lg'>
            <table className="table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Category</th>
                  <th scope="col" className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category._id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <td className="px-6 py-4">{category.name}</td>
                    <td className="px-6 py-4 flex space-x-2">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                        onClick={() => handleEdit(true, category)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                        onClick={() => handleDelete(category._id)}
                      >
                        Remove
                      </button>

                    </td>
                  </tr>

                ))
                }
              </tbody>
            </table>
          </div>
        </div>

      )}
      {isModalOpen && <GlobalModal isOpen={isModalOpen} onClose={handleEdit}>
        <AddCategory category={singleCategory} onClose={handleEdit} />

      </GlobalModal>}
    </>
  );
}

export default CategoriesTable;
