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

const url = import.meta.env.VITE_URL


function ProductTable({ products, isLoading, viewOnly = false }) {
  const [singleProduct, setSingleProduct] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isProductPageOpen, setIsProductPageOpen] = useState(false);
  const [handleImageModalOpen, setHandelImageModalOpen] = useState(false)
  const { setSendGetRequest } = useContext(GlobalContext);

  const handleDelete = async (id) => {
    try {
      const Confirmation = confirm("Are you sure you want to delete?");
      if (Confirmation) {
        const { data } = await axios.delete(`${url}/products/delete/${id}`, { withCredentials: true });
        if (data.success) {
          console.log("Product deleted successfully");
          toastFire(true, data.message)
          setSendGetRequest((prev) => !prev);
        }
      }
    } catch (error) {
      console.log("Error deleting product:", error)
      toastFire(false, error.response.data.error)
      setSendGetRequest((prev) => !prev);
    }
  };

  const handleEditImage = (bool, product = null) => {
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
  <>
    {!isLoading &&
      <div>
        <div>
          {!viewOnly && <>
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
            >Refresh</button></>}

          <div className={`p-4 relative ${viewOnly ? "w-full" : "w-[80%]"} mx-auto overflow-x-auto shadow-md sm:rounded-lg`}>
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
                  {!viewOnly && <th scope="col" className="px-6 py-3">Actions</th>}
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
                    <td className="px-6 py-4">{product.price.toLocaleString('he-IL', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}{' USD'}</td>
                    <td className="px-6 py-4" onClick={() => handleEditImage(true, product)}>
                      <button>
                        <img width={60} height={60} src={product.image_link} alt={product.model} />
                      </button>
                    </td>
                    {!viewOnly && <td className="px-6 py-4 flex space-x-2">
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
                    </td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {handleImageModalOpen &&
            <GlobalModal isOpen={handleImageModalOpen} onClose={handleEditImage}>
              <ShowImage product={singleProduct} onClose={handleEditImage} setRefresh={setSendGetRequest} />
            </GlobalModal>}


          <Modal isOpen={isProductModalOpen} onClose={handleCloseModal}>
            <AddProduct product={singleProduct} setRefresh={setSendGetRequest} onSave={handleSaveProduct} />
          </Modal>

          {isProductPageOpen && (
            <Modal isOpen={isProductPageOpen} onClose={handleCloseProductPage}>
              <ProductPage product={singleProduct} />
            </Modal>
          )}
        </div>

      </div>}
  </>
  );
}

export default ProductTable;



// import React, { useState, useContext } from "react";
// import axios from "axios";
// import Modal from "../../modals/Modal";
// import AddProduct from "../AddProduct";
// import { AiOutlineEye } from "react-icons/ai";
// import ProductPage from "./ProductPage";
// import GlobalModal from "../../modals/GlobalModal";
// import ShowImage from "../../../utils/ShowImage";
// import { GlobalContext } from "../../../contexts/GlobalContext";
// import { toastFire } from "../../../utils/Toaster";

// const url = import.meta.env.VITE_URL;

// function ProductTable({ products, isLoading, viewOnly = false }) {
//   const [singleProduct, setSingleProduct] = useState(null);
//   const [isProductModalOpen, setIsProductModalOpen] = useState(false);
//   const [isProductPageOpen, setIsProductPageOpen] = useState(false);
//   const [handleImageModalOpen, setHandleImageModalOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortBy, setSortBy] = useState("");
//   const { setSendGetRequest } = useContext(GlobalContext);

//   const handleDelete = async (id) => {
//     try {
//       const confirmation = confirm("Are you sure you want to delete?");
//       if (confirmation) {
//         const { data } = await axios.delete(`${url}/products/delete/${id}`, { withCredentials: true });
//         if (data.success) {
//           toastFire(true, data.message);
//           setSendGetRequest((prev) => !prev);
//         }
//       }
//     } catch (error) {
//       toastFire(false, error.response.data.error);
//       setSendGetRequest((prev) => !prev);
//     }
//   };

//   const handleEditImage = (bool, product = null) => {
//     setSingleProduct(product);
//     setHandleImageModalOpen(bool);
//   };

//   const handleEdit = (data) => {
//     setSingleProduct(data);
//     setIsProductModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setSingleProduct(null);
//     setIsProductModalOpen(false);
//   };

//   const handleSaveProduct = () => {
//     handleCloseModal();
//   };

//   const handleViewProduct = (product) => {
//     setSingleProduct(product);
//     setIsProductPageOpen(true);
//   };

//   const handleCloseProductPage = () => {
//     setSingleProduct(null);
//     setIsProductPageOpen(false);
//   };

//   const filteredProducts = products.filter((product) =>
//     product.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     product.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     product.colors.join(", ").toLowerCase().includes(searchTerm.toLowerCase()) ||
//     product.car_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     product.year.toString().includes(searchTerm) ||
//     product.price.toString().includes(searchTerm)
//   );

//   if (sortBy === "company") {
//     filteredProducts.sort((a, b) => a.company.localeCompare(b.company));
//   } else if (sortBy === "price") {
//     filteredProducts.sort((a, b) => a.price - b.price);
//   }

//   return (
//     <>
//       {!isLoading && (
//         <div>
//           <div>
//             {!viewOnly && (
//               <>
//                 <button
//                   type="btn"
//                   className="justify-self-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                   onClick={() => handleEdit(null)}
//                 >
//                   Add Product
//                 </button>
//                 <button
//                   type="btn"
//                   className="justify-self-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                   onClick={() => setSendGetRequest((prev) => !prev)}
//                 >
//                   Refresh
//                 </button>
//               </>
//             )}

//             <input
//               type="text"
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="mb-4 p-2 border border-gray-300 rounded"
//             />

//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="mb-4 p-2 border border-gray-300 rounded"
//             >
//               <option value="">Sort By</option>
//               <option value="company">Company</option>
//               <option value="price">Price</option>
//             </select>

//             <div className={`p-4 relative ${viewOnly ? "w-full" : "w-[80%]"} mx-auto overflow-x-auto shadow-md sm:rounded-lg`}>
//               <table className="w-full text-sm h-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
//                 <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
//                   <tr>
//                     <th scope="col" className="px-6 py-3">Company</th>
//                     <th scope="col" className="px-6 py-3">Model</th>
//                     <th scope="col" className="px-6 py-3">Colors</th>
//                     <th scope="col" className="px-6 py-3">Car Type</th>
//                     <th scope="col" className="px-6 py-3">Year</th>
//                     <th scope="col" className="px-6 py-3">Price</th>
//                     <th scope="col" className="px-6 py-3">Image</th>
//                     {!viewOnly && <th scope="col" className="px-6 py-3">Actions</th>}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredProducts.map((product) => (
//                     <tr key={product._id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
//                       <td className="px-6 py-4">{product.company}</td>
//                       <td className="px-6 py-4">{product.model}</td>
//                       <td className="px-6 py-4">{product.colors.join(", ")}</td>
//                       <td className="px-6 py-4">{product.car_type}</td>
//                       <td className="px-6 py-4">{product.year}</td>
//                       <td className="px-6 py-4">{product.price}</td>
//                       <td className="px-6 py-4" onClick={() => handleEditImage(true, product)}>
//                         <button>
//                           <img width={60} height={60} src={product.image_link} alt={product.model} />
//                         </button>
//                       </td>
//                       {!viewOnly && (
//                         <td className="px-6 py-4 flex space-x-2">
//                           <button
//                             className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
//                             onClick={() => handleEdit(product)}
//                           >
//                             Edit
//                           </button>
//                           <button
//                             className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
//                             onClick={() => handleDelete(product._id)}
//                           >
//                             Remove
//                           </button>
//                           <button
//                             className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
//                             onClick={() => handleViewProduct(product)}
//                           >
//                             <AiOutlineEye />
//                           </button>
//                         </td>
//                       )}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {handleImageModalOpen && (
//               <GlobalModal isOpen={handleImageModalOpen} onClose={() => handleEditImage(false)}>
//                 <ShowImage product={singleProduct} onClose={() => handleEditImage(false)} setRefresh={setSendGetRequest} />
//               </GlobalModal>
//             )}

//             <Modal isOpen={isProductModalOpen} onClose={handleCloseModal}>
//               <AddProduct product={singleProduct} setRefresh={setSendGetRequest} onSave={handleSaveProduct} />
//             </Modal>

//             {isProductPageOpen && (
//               <Modal isOpen={isProductPageOpen} onClose={handleCloseProductPage}>
//                 <ProductPage product={singleProduct} />
//               </Modal>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default ProductTable;
