import React, { useState, useContext } from "react";
import axios from "axios";
import Modal from "../../modals/Modal";
import AddProduct from "../AddProduct";
import { AiOutlineEye } from "react-icons/ai";
import ProductPage from "./ProductPage";
import GlobalModal from "../../modals/GlobalModal";
import ShowImage from "../../../utils/ShowImage";
import { GlobalContext } from "../../../contexts/GlobalContext";
import { toastFire } from "../../../utils/Toaster";

const url = import.meta.env.VITE_URL;

function ProductTable({ products, isLoading, viewOnly = false }) {
  const [singleProduct, setSingleProduct] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isProductPageOpen, setIsProductPageOpen] = useState(false);
  const [handleImageModalOpen, setHandelImageModalOpen] = useState(false);
  const { setSendGetRequest } = useContext(GlobalContext);
  // console.log(products);

  const handleDelete = async (id) => {
    try {
      const Confirmation = confirm("Are you sure you want to delete?");
      if (Confirmation) {
        const { data } = await axios.delete(`${url}/products/delete/${id}`, {
          withCredentials: true,
        });
        if (data.success) {
          console.log("Product deleted successfully");
          toastFire(true, data.message);
          setSendGetRequest((prev) => !prev);
        }
      }
    } catch (error) {
      console.log("Error deleting product:", error);
      toastFire(false, error.response.data.error);
      setSendGetRequest((prev) => !prev);
    }
  };

  const handleEditImage = (bool, product = null) => {
    setSingleProduct(product);
    setHandelImageModalOpen(bool);
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
    <>
      {!isLoading && (
        <div>
          <div>
            {!viewOnly && (
              <div className="flex gap-2 justify-center items-center mt-3">
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
                  onClick={() => setSendGetRequest((prev) => !prev)}
                >
                  Refresh
                </button>
              </div>
            )}

            <div
              className={`p-4 relative ${
                viewOnly ? "w-full" : "w-[80%]"
              } mx-auto overflow-x-auto shadow-md sm:rounded-lg`}
            >
              <table className="w-full text-sm h-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Company
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Model
                    </th>
                    {/* <th scope="col" className="px-6 py-3">Colors</th> */}
                    <th scope="col" className="px-6 py-3">
                      Category
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
                    {!viewOnly && (
                      <th scope="col" className="px-6 py-3">
                        Actions
                      </th>
                    )}
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
                      {/* <td className="px-6 py-4">{product.colors.join(", ")}</td> */}
                      <td className="px-6 py-4">{product.category.name}</td>
                      <td className="px-6 py-4">{product.year}</td>
                      <td className="px-6 py-4">
                        {"$ "}
                        {product.price.toLocaleString(undefined, {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}
                      </td>
                      <td
                        className="px-6 py-4"
                        onClick={() => handleEditImage(true, product)}
                      >
                        <button>
                          <img
                            width={60}
                            height={60}
                            src={product.image_link}
                            alt={product.model}
                          />
                        </button>
                      </td>
                      {!viewOnly && (
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
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {handleImageModalOpen && (
              <GlobalModal
                isOpen={handleImageModalOpen}
                onClose={handleEditImage}
              >
                <ShowImage
                  product={singleProduct}
                  onClose={handleEditImage}
                  setRefresh={setSendGetRequest}
                />
              </GlobalModal>
            )}

            <Modal isOpen={isProductModalOpen} onClose={handleCloseModal}>
              <AddProduct
                product={singleProduct}
                setRefresh={setSendGetRequest}
                onSave={handleSaveProduct}
              />
            </Modal>

            {isProductPageOpen && (
              <Modal
                isOpen={isProductPageOpen}
                onClose={handleCloseProductPage}
              >
                <ProductPage product={singleProduct} isOpen={isProductPageOpen}
                onClose={handleCloseProductPage}/>
              </Modal>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ProductTable;
