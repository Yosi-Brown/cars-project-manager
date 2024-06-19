import React, { useState, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "../../contexts/GlobalContext";
import GlobalModal from "../modals/GlobalModal";
import ShowUser from "../../utils/ShowUser";
import ProductTable from "../product/productTable/ProductTable";
import { toastFire } from "../../utils/Toaster";


const url = import.meta.env.VITE_URL

function OrdersTable({ orders, isLoading }) {
  console.log(orders);
  const { setSendGetRequest } = useContext(GlobalContext);
  const [handelModalOpen, setHandelModalOpen] = useState(false)
  const [viewProductsModalOpen, setViewProductsModalOpen] = useState(false)
  const [singleUser, setSingleUser] = useState(null)
  const [productsOrder, setProductsOrder] = useState([])


  const showProducts = (bool, products = null) => {
    const productsList = products?.map(item => item.product);
    // console.log(products)
    setProductsOrder(productsList);
    setViewProductsModalOpen(bool);

  };

  const showUser = (bool, user = null) => {
    setSingleUser(user)
    setHandelModalOpen(bool)

  };

  const handleDelete = async (id) => {
    try {
      const sure = confirm("Are you sure you want to delete?");
      if (sure) {
        const { data } = await axios.delete(`${url}/orders/delete/${id}`, { withCredentials: true });
        if (data.success) {
          toastFire(true, data.message)
          console.log("Order deleted successfully");
          setSendGetRequest((prev) => !prev);
        }
      }
    } catch (error) {
      console.log(error)
      toastFire(false, error.response.data.error);
    }
  };

  const handleStatus = async (id, newStatus) => {
    try {
      const { data } = await axios.put(`${url}/orders/updateStatus/${id}`, { newStatus }, { withCredentials: true });
      if (data.success) {
        console.log(data.message)
        toastFire(true, data.message)
        setSendGetRequest((prev) => !prev)
      }

    } catch (error) {
      console.log(error)
      toastFire(false, error.response.data.error)
    }

  };

  return (
    <>
      {!isLoading && <div>
        <button
          type="button"
          className="justify-self-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => setSendGetRequest((prev) => !prev)}
        >
          Refresh
        </button>
        <div className="relative w-[80%] mx-auto overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm h-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Customer Name</th>
                <th scope="col" className="px-6 py-3">Order Date</th>
                <th scope="col" className="px-6 py-3">Total Price</th>
                <th scope="col" className="px-6 py-3">order Status</th>
                <th scope="col" className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                  <td className="px-6 py-4">
                    <button
                      onClick={() => showUser(true, order.user)}>{order.user.firstName} {order.user.lastName}</button></td>
                  <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString('he-IL', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  })}</td> {/* GPT */}
                  <td className="px-6 py-4">{order.totalPrice.toLocaleString('he-IL', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}{' USD'}</td>
                  <td className="px-6 py-4">
                    {/* {order.status} */}
                    <select defaultValue={order.status}
                      onChange={(e) => {
                        const Confirmation = confirm("Are you sure you want to change Status?")
                        if (Confirmation) { handleStatus(order._id, e.target.value) }
                        else { e.target.value = order.status }
                      }
                      }
                      className={`
                      ${order.status === 1
                          ? "bg-yellow-400"
                          : order.status === 2
                            ? "bg-blue-500"
                            : order.status === 3
                              ? "bg-purple-500"
                              : order.status === 4
                                ? "bg-green-500"
                                : order.status === 5
                                  ? "bg-red-500"
                                  : "bg-black"
                        }  text-white
                        text-sm rounded-lg focus:ring-blue-500
                         focus:border-blue-500 block w-full`}
                    >
                      <option value={1} className="bg-yellow-500">Order Pending </option>
                      <option value={2} className="bg-blue-500">Order Processing</option>
                      <option value={3} className="bg-purple-500">Order Shipped</option>
                      <option value={4} className="bg-green-500">Order Completed</option>
                      <option value={5} className="bg-red-500">Order Cancelled</option>
                    </select></td>
                  <td className="px-6 py-4 flex space-x-2">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                      onClick={() => handleDelete(order._id)}>
                      Remove
                    </button>
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                      onClick={() => {
                        showProducts(true, order.products)
                      }}>
                      View Products
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {handelModalOpen &&
            <GlobalModal isOpen={handelModalOpen} onClose={showUser}>
              <ShowUser user={singleUser} />
            </GlobalModal>
          }
          {viewProductsModalOpen &&
            <GlobalModal isOpen={viewProductsModalOpen} onClose={showProducts}>
              <ProductTable products={productsOrder} viewOnly={true} />
            </GlobalModal>}

        </div>
      </div>}

    </>
  );
}

export default OrdersTable;