import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../../modals/Modal";
import AddProduct from "../AddProduct";
import { AiOutlineEye } from "react-icons/ai";
import ProductPage from "./ProductPage";
import { FiRefreshCcw } from "react-icons/fi";
import GlobalModal from "../../modals/GlobalModal";
import ShowImage from "../../../utils/ShowImage";


function ProductTable() {
  const [products, setProducts] = useState([]);
  const [singleProduct, setSingleProduct] = useState(null);
  const [refresh, setRefresh] = useState(true);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isProductPageOpen, setIsProductPageOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [handleImageModalOpen, setHandelImageModalOpen] = useState(false)
  // const [ingleImage, setSingleImage] = useState(null)

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get("http://localhost:3000/products/getall");
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [refresh]);

  async function handleDelete(id) {
    try {
      const sure = confirm("Are you sure you want to delete?");
      if (sure) {
        const { data } = await axios.delete(`http://localhost:3000/products/delete/${id}`);
        if (data.success) {
          console.log("Product deleted successfully");
          setRefresh((prev) => !prev);
        }
      }
    } catch (error) {
      console.log("Error deleting product:", error);
    }
  }

  function handleEditImage(bool, product = null) {
    setSingleProduct(product)
    setHandelImageModalOpen(bool)
  };

  const handleEdit = (data) => {
    setSingleProduct(data);
    setIsProductModalOpen(true);
  };

  const handleCloseModal = () => {
    setSingleProduct(null);
    setIsProductModalOpen(false);
  };

  const handleSaveProduct = () => {
    handleCloseModal();
  };

  const handleViewProduct = (product) => {
    setSingleProduct(product);
    setIsProductPageOpen(true);
  };

  const handleCloseProductPage = () => {
    setSingleProduct(null);
    setIsProductPageOpen(false);
  };

  return (
    <div>
      {loading ? (
        <div role="status">
          <svg
            aria-hidden="true"
            className="inline w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <br />
          <span>Loading...</span>
        </div>
      ) : (
        <div>

          <button
            type="btn"
            className="justify-self-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => handleEdit(null)}
          >
            Add Product
          </button>
          <button
            type="btn"
            className="justify-self-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => setRefresh((prev) => !prev)}
          >
            <FiRefreshCcw />
          </button>

          <div className="relative w-[80%] mx-auto overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm h-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Company</th>
                  <th scope="col" className="px-6 py-3">Model</th>
                  <th scope="col" className="px-6 py-3">Colors</th>
                  <th scope="col" className="px-6 py-3">Car Type</th>
                  <th scope="col" className="px-6 py-3">Year</th>
                  <th scope="col" className="px-6 py-3">Price</th>
                  <th scope="col" className="px-6 py-3">Image</th>
                  <th scope="col" className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <td className="px-6 py-4">{product.company}</td>
                    <td className="px-6 py-4">{product.model}</td>
                    <td className="px-6 py-4">{product.colors.join(", ")}</td>
                    <td className="px-6 py-4">{product.car_type}</td>
                    <td className="px-6 py-4">{product.year}</td>
                    <td className="px-6 py-4">{product.price}</td>
                    <td className="px-6 py-4" onClick={() => handleEditImage(true, product)}>
                      <button>
                        <img width={60} height={60} src={product.image_link} alt={product.model} />
                      </button>
                    </td>
                    <td className="px-6 py-4 flex space-x-2">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                        onClick={() => handleEdit(product)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                        onClick={() => handleDelete(product._id)}
                      >
                        Remove
                      </button>
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                        onClick={() => handleViewProduct(product)}
                      >
                        <AiOutlineEye />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {handleImageModalOpen &&
          <GlobalModal isOpen={handleImageModalOpen} onClose={handleEditImage}>
            <ShowImage product={singleProduct} onClose={handleEditImage} setRefresh={setRefresh}/> 
          </GlobalModal>}


          <Modal isOpen={isProductModalOpen} onClose={handleCloseModal}>
            <AddProduct product={singleProduct} setRefresh={setRefresh} onSave={handleSaveProduct} />
          </Modal>

          {isProductPageOpen && (
            <Modal isOpen={isProductPageOpen} onClose={handleCloseProductPage}>
              <ProductPage product={singleProduct} />
            </Modal>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductTable;