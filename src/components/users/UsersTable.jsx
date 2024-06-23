import React, { useState, useContext } from "react";
import axios from "axios";
import GlobalModal from "../modals/GlobalModal";
import RegisterForm from "../registerUser/RegisterForm";
import { GlobalContext } from "../../contexts/GlobalContext";
import ShowUser from "../../utils/ShowUser";
import { toastFire } from "../../utils/Toaster";


const url = import.meta.env.VITE_URL;

function UsersTable({ users, isLoading }) {

  const [handelModalOpen, setHandelModalOpen] = useState(false)
  const [singleUser, setSingleUser] = useState(null)
  const [viewUser, setViewUser] = useState(false)
  const { setSendGetRequest } = useContext(GlobalContext);


  const handleDeleteUser = async (id) => {
    try {
      const confirmation = confirm("Are you sure you want to delete?");
      if (confirmation) {
        const { data } = await axios.delete(`${url}/users/delete/${id}`, { withCredentials: true })
        console.log(data)
        if (data.success) {
          console.log("User deleted successfully")
          toastFire(true, data.message)
          setSendGetRequest((prev) => !prev);
        }
      }
    } catch (error) {
      console.log(error)
      toastFire(false, error.response.data.error)
    }
  };

  const handleRole = async (id, newRole) => {
    try {
      const { data } = await axios.put(`${url}/users/update-role/${id}`, { newRole }, { withCredentials: true });
      // console.log(data)
      if (data.success) {
        toastFire(true, data.message)
        // alert('role change successful')
        setSendGetRequest((prev) => !prev)
      }
    } catch (error) {
      console.log(error)
      toastFire(false, error.response.data.message)
    }
  };

  const handleEditUser = (bool, user = null) => {
    setSingleUser(user)
    setHandelModalOpen(bool)
  };

  const handleViewUser = (bool, user = null) => {
    setSingleUser(user)
    setViewUser(bool)

  };

  return (
    <>
      {!isLoading && (<div>
        <div>
          <button
            type="button"
            className="justify-self-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => setSendGetRequest((prev) => !prev)}
          >Refresh</button>

          <div className="relative w-[80%] mx-auto overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm h-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">First Name</th>
                  <th scope="col" className="px-6 py-3">Last Name</th>
                  <th scope="col" className="px-6 py-3">Email</th>
                  <th scope="col" className="px-6 py-3">Phone</th>
                  <th scope="col" className="px-6 py-3">Role</th>
                  <th scope="col" className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user) => (
                  <tr key={user._id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <td className="px-6 py-4">{user.firstName}</td>
                    <td className="px-6 py-4">{user.lastName}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.phone}</td>
                    <td className="px-6 py-4">
                      <select defaultValue={user.role}
                        onChange={(e) => {
                          const Confirmation = confirm("Are you sure you want to change Role?")
                          if (Confirmation) { handleRole(user._id, e.target.value) }
                          else { e.target.value = user.role }
                        }
                        }
                        className={`
                      ${user.role === "regular"
                            ? "bg-yellow-400"
                            : user.role === "manager"
                              ? "bg-purple-500"
                              : user.role === "admin"
                                ? "bg-green-700"
                                : "bg-black"
                          }
                       text-white
                        text-sm rounded-lg focus:ring-blue-500
                         focus:border-blue-500 block w-full`}
                      >
                        <option value='regular' className="bg-yellow-500">Regular </option>
                        <option value='manager' className="bg-purple-500">Manager</option>
                        <option value='admin' className="bg-green-500">Admin</option>
                      </select></td>
                    <td className="px-6 py-4 flex space-x-2">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                        onClick={() => { handleEditUser(true, user) }}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        Remove
                      </button>
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                        onClick={() => handleViewUser(true, user)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
            </div>
            {/* {handelModalOpen && 
            <GlobalModal isOpen={handelModalOpen}>
            <RegisterForm />
            </GlobalModal>
            } */}
          </div>
        </div>
      </div>)}
      <div className="h-auto w-auto">
        {handelModalOpen &&
          <GlobalModal isOpen={handelModalOpen} onClose={handleEditUser}>
            <RegisterForm user={singleUser} editUser={true} onClose={handleEditUser} />
          </GlobalModal>
        }
      </div>

      {viewUser &&
        <GlobalModal isOpen={viewUser} onClose={handleViewUser}>
          <ShowUser user={singleUser} />
        </GlobalModal>
      }
    </>
  );
}

export default UsersTable;