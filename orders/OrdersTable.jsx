
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// // import Modal from "../../modals/Modal";
// // import Addorders from "../Addorders";
// import { AiOutlineEye } from "react-icons/ai";
// // import ProductPage from "../src/components/product/productTable/ProductPage";

// function OrdersTable() {
//   const [order, setorder] = useState([]);
//   const [singleorder, setsingleorder] = useState(null);
//   const [refresh, setRefresh] = useState(true);
// //   const [isorderModalOpen, setisorderModalOpen] = useState(false);
// //   const [isorderPageOpen, setIsorderPageOpen] = useState(false);


//   const fetchorders = async () => {
//     try {

//       const { data } = await axios.get("http://localhost:3000/orders/getall");
//       if (data.success) {
//         setorder(data.orders);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchorders();
//   }, [refresh]);

//   async function handleDelete(id) {
//     try {
        
//         const sure = confirm("Are you sure you want to delete?");
//         if (sure) {
//             const { data } = await axios.delete(
//                 `http://localhost:3000/orders/delete/${id}`
//             );
//             if (data.success) {
//                 console.log("orders deleted successfully");
//                 setRefresh((prev) => !prev);
//             }
//         }
//     } catch (error) {
//         console.log("Error deleting orders:", error);
//     }
// }


// //   const handleEdit = (data) => {
// //     setsingleorders(data);
// //     setisordersModalOpen(true);
// //   };

// //   const handleCloseModal = () => {
// //     setsingleorders(null);
// //     setisordersModalOpen(false);
// //   };

// //   const handleSaveorders = () => {
// //     handleCloseModal();
// //   };

// //   const handleVieworders = (orders) => {
// //     setsingleorder(orders);
// //     setIsorderPageOpen(true);
// //   };

// //   const handleCloseordersPage = () => {
// //     setsingleorder(null);
// //     setIsorderPageOpen(false);
// //   };

//   return(
//     <div>test</div>
//   )

// //   return (
// //     <div>
// //       <button
// //         type="btn"
// //         className="justify-self-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800:"
// //         onClick={() => handleEdit(null)}
// //       >
// //         Add orders
// //       </button>

// //       <div className="relative w-[80%] mx-auto overflow-x-auto shadow-md sm:rounded-lg">
// //         <table className="w-full text-sm h-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
// //           <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
// //             <tr>
// //               <th scope="col" className="px-6 py-3">
// //                 Name
// //               </th>
// //               {/* <th scope="col" className="px-6 py-3">
// //                 orders
// //               </th> */}
// //               <th scope="col" className="px-6 py-3">
// //                 Date
// //               </th>
// //               <th scope="col" className="px-6 py-3">
// //                 TotalPrice
// //               </th>
// //               <th scope="col" className="px-6 py-3">
// //                 Actions
// //               </th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {orderss.map((orders) => (
// //               <tr
// //                 key={orders._id}
// //                 className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
// //               >
// //                 {/* <td className="px-6 py-4">{orders.name}</td> */}
// //                 {/* <td className="px-6 py-4">{orders.orders}</td> */}
// //                 <td className="px-6 py-4">{orders.createdAt}</td>
// //                 <td className="px-6 py-4">{orders.totalPrice}</td>
// //                 <td className="px-6 py-4">{orders.actions}</td>
// //                 <td className="px-6 py-4"></td>
                
// //                 <td className="px-6 py-4 flex space-x-2">
// //                   <button
// //                     className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
// //                     onClick={() => handleEdit(orders)}
// //                   >
// //                     Edit
// //                   </button>
// //                   <button
// //                     className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
// //                     onClick={() => handleDelete(orders._id)}
// //                   >
// //                     Remove
// //                   </button>
// //                   <button
// //                     className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
// //                     onClick={() => handleVieworders(orders)}
// //                   >
// //                     {/* כפתור צפיית מוצר */}
// //                     <AiOutlineEye />
// //                   </button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>

// //       {/* <Modal isOpen={isordersModalOpen} onClose={handleCloseModal}>
// //         <Addorders orders={singleorders} setRefresh={setRefresh} onSave={handleSaveorders} />
// //       </Modal>

// //       {isordersPageOpen && (
// //         <Modal isOpen={isordersPageOpen} onClose={handleCloseordersPage}>
// //           <ordersPage orders={singleorders} />
// //         </Modal>
// //       )} */}
      
// //     </div>
// //   );
// }

// export default OrdersTable;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineEye } from "react-icons/ai";

function OrdersTable() {
  const [orders, setOrders] = useState([]);
  const [refresh, setRefresh] = useState(true);

  const fetchOrders = async () => {
      try {
          const { data } = await axios.get("http://localhost:3000/orders/getall");
          if (data.success) {
              console.log(data.orders)
              setOrders(data.orders);
            }
              
            
        } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

//   async function handleDelete(id) {
//     try {
//       const sure = confirm("Are you sure you want to delete?");
//       if (sure) {
//         const { data } = await axios.delete(`http://localhost:3000/orders/delete/${id}`);
//         if (data.success) {
//           console.log("Order deleted successfully");
//           setRefresh((prev) => !prev);
//         }
//       }
//     } catch (error) {
//       console.log("Error deleting order:", error);
//     }
//   }

  // const handleEdit = (order) => {
  //   // setSingleOrder(order);
  //   // setIsOrderModalOpen(true);
  // };

  // const handleCloseModal = () => {
  //   // setSingleOrder(null);
  //   // setIsOrderModalOpen(false);
  // };

  // const handleSaveOrder = () => {
  //   // handleCloseModal();
  // };

  // const handleViewOrder = (order) => {
  //   // setSingleOrder(order);
  //   // setIsOrderPageOpen(true);
  // };

  // const handleCloseOrderPage = () => {
  //   // setSingleOrder(null);
  //   // setIsOrderPageOpen(false);
  // };
// return (
//     <div> orders table test</div>
// )

  return (
    <div>
      <button
        type="button"
        className="justify-self-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={() => setRefresh((prev) => !prev)}
      >
        Refresh
      </button>

      <div className="relative w-[80%] mx-auto overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm h-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Total Price
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
              >
                <td className="px-6 py-4">{order.customer_details.customer_phone}</td>
                <td className="px-6 py-4">{order.createdAt}</td>
                <td className="px-6 py-4">{order.totalPrice}</td>
                <td className="px-6 py-4 flex space-x-2">
                  {/* <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                    onClick={() => handleEdit(order)}
                  >
                    Edit
                  </button> */}
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    onClick={() => handleDelete(order._id)}
                  >
                    Remove
                  </button>
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                    onClick={() => handleViewOrder(order)}
                  >
                    <AiOutlineEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* <Modal isOpen={isOrderModalOpen} onClose={handleCloseModal}>
        <AddOrder order={singleOrder} setRefresh={setRefresh} onSave={handleSaveOrder} />
      </Modal>

      {isOrderPageOpen && (
        <Modal isOpen={isOrderPageOpen} onClose={handleCloseOrderPage}>
          <OrderPage order={singleOrder} />
        </Modal>
      )} */}
    </div>
  );
}

export default OrdersTable;

