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
        console.log("Fetched orders:", data.orders);
        setOrders(data.orders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [refresh]);

  const handleDelete = async (id) => {
    try {
      const sure = confirm("Are you sure you want to delete?");
      if (sure) {
        const { data } = await axios.delete(`http://localhost:3000/orders/delete/${id}`);
        if (data.success) {
          console.log("Order deleted successfully");
          setRefresh((prev) => !prev);
        }
      }
    } catch (error) {
      console.log("Error deleting order:", error);
    }
  };

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
              <th scope="col" className="px-6 py-3">Customer Name</th>
              <th scope="col" className="px-6 py-3">Order Date</th>
              <th scope="col" className="px-6 py-3">Total Price</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <td className="px-6 py-4">{order.user.firstName} {order.user.lastName}</td>
                <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4">{order.totalPrice}</td>
                {/* <td className="px-6 py-4">{order.products.reduce((total, item) => total + parseFloat(item.product.price.replace(/[^0-9.-]+/g,"")), 0)} USD</td> */}
                <td className="px-6 py-4 flex space-x-2">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    onClick={() => handleDelete(order._id)}
                  >
                    Remove
                  </button>
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                    onClick={() => console.log(order.user)}
                  >
                    <AiOutlineEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrdersTable;