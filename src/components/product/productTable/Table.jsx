import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../../modals/Modal";
import AddProduct from "../AddProduct";
import { AiOutlineEye } from "react-icons/ai";
import ProductPage from "./ProductPage";

function Table() {
  const [products, setProducts] = useState([]);
  const [singleProduct, setSingleProduct] = useState(null);
  const [refresh, setRefresh] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProductPageOpen, setIsProductPageOpen] = useState(false);
  

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/products/getall");
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error(error);
    }
  };

  async function handleDelete(id) {
    try {
      const sure = confirm("Are you sure you want to delete?")
      if(sure){        
        const { data } = await axios.delete(`http://localhost:3000/products/delete/${id}`);
        if (data.success) {
          console.log("deleted");
          setRefresh((prev) => !prev);
        }}
      } catch (error) {
        console.log(error);
        console.log("not deleted");
      }
    }
    
    const handleEdit = (data) => {
      setSingleProduct(data);
      setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
      setSingleProduct(null);
      setIsModalOpen(false);
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
    
    useEffect(() => {
      fetchProducts();
    }, [refresh]);

    return (
      <div>
      <button
        type="btn"
        className="justify-self-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800:"
        onClick={() => handleEdit(null)}
      >
        Add Product
      </button>

      <div className="relative w-[80%] mx-auto overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm h-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Company
              </th>
              <th scope="col" className="px-6 py-3">
                Model
              </th>
              <th scope="col" className="px-6 py-3">
                Colors
              </th>
              <th scope="col" className="px-6 py-3">
                Car Type
              </th>
              <th scope="col" className="px-6 py-3">
                Year
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
              >
                <td className="px-6 py-4">{product.company}</td>
                <td className="px-6 py-4">{product.model}</td>
                <td className="px-6 py-4">{product.colors.join(", ")}</td>
                <td className="px-6 py-4">{product.car_type}</td>
                <td className="px-6 py-4">{product.year}</td>
                <td className="px-6 py-4">{product.price}</td>
                <td className="px-6 py-4">
                  <img width={60} height={60} src={product.image_link} alt={product.model}
                  // onClick={}
                  />
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
                    {/* btn to watch product */}
                    <AiOutlineEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <AddProduct product={singleProduct} setRefresh={setRefresh} onSave={handleSaveProduct} />
      </Modal>

      {isProductPageOpen && (
        <Modal isOpen={isProductPageOpen} onClose={handleCloseProductPage}>
          <ProductPage product={singleProduct} />
        </Modal>
      )}
    </div>
  );
}

export default Table;


