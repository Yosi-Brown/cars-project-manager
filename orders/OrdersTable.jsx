
import React, { useState, useEffect } from "react";
import axios from "axios";
// import Modal from "../../modals/Modal";
// import Addorders from "../Addorders";
import { AiOutlineEye } from "react-icons/ai";
// import ProductPage from "../src/components/product/productTable/ProductPage";

function OrdersTable() {
  const [orderss, setorderss] = useState([]);
  const [singleorders, setsingleorders] = useState(null);
  const [refresh, setRefresh] = useState(true);
  const [isordersModalOpen, setisordersModalOpen] = useState(false);
  const [isordersPageOpen, setIsordersPageOpen] = useState(false);


  const fetchorderss = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/orders/getall");
      if (data.success) {
        setorderss(data.orderss);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchorderss();
  }, [refresh]);

  async function handleDelete(id) {
    try {
        const sure = confirm("Are you sure you want to delete?");
        if (sure) {
            const { data } = await axios.delete(
                `http://localhost:3000/orders/delete/${id}`
            );
            if (data.success) {
                console.log("orders deleted successfully");
                setRefresh((prev) => !prev);
            }
        }
    } catch (error) {
        console.log("Error deleting orders:", error);
    }
}


  const handleEdit = (data) => {
    setsingleorders(data);
    setisordersModalOpen(true);
  };

  const handleCloseModal = () => {
    setsingleorders(null);
    setisordersModalOpen(false);
  };

  const handleSaveorders = () => {
    handleCloseModal();
  };

  const handleVieworders = (orders) => {
    setsingleorders(orders);
    setIsordersPageOpen(true);
  };

  const handleCloseordersPage = () => {
    setsingleorders(null);
    setIsordersPageOpen(false);
  };

  return(
    <div>test</div>
  )

//   return (
//     <div>
//       <button
//         type="btn"
//         className="justify-self-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800:"
//         onClick={() => handleEdit(null)}
//       >
//         Add orders
//       </button>

//       <div className="relative w-[80%] mx-auto overflow-x-auto shadow-md sm:rounded-lg">
//         <table className="w-full text-sm h-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
//           <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//             <tr>
//               <th scope="col" className="px-6 py-3">
//                 Name
//               </th>
//               {/* <th scope="col" className="px-6 py-3">
//                 orders
//               </th> */}
//               <th scope="col" className="px-6 py-3">
//                 Date
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 TotalPrice
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {orderss.map((orders) => (
//               <tr
//                 key={orders._id}
//                 className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
//               >
//                 {/* <td className="px-6 py-4">{orders.name}</td> */}
//                 {/* <td className="px-6 py-4">{orders.orders}</td> */}
//                 <td className="px-6 py-4">{orders.createdAt}</td>
//                 <td className="px-6 py-4">{orders.totalPrice}</td>
//                 <td className="px-6 py-4">{orders.actions}</td>
//                 <td className="px-6 py-4"></td>
                
//                 <td className="px-6 py-4 flex space-x-2">
//                   <button
//                     className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
//                     onClick={() => handleEdit(orders)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
//                     onClick={() => handleDelete(orders._id)}
//                   >
//                     Remove
//                   </button>
//                   <button
//                     className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
//                     onClick={() => handleVieworders(orders)}
//                   >
//                     {/* כפתור צפיית מוצר */}
//                     <AiOutlineEye />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* <Modal isOpen={isordersModalOpen} onClose={handleCloseModal}>
//         <Addorders orders={singleorders} setRefresh={setRefresh} onSave={handleSaveorders} />
//       </Modal>

//       {isordersPageOpen && (
//         <Modal isOpen={isordersPageOpen} onClose={handleCloseordersPage}>
//           <ordersPage orders={singleorders} />
//         </Modal>
//       )} */}
      
//     </div>
//   );
}

export default OrdersTable;


