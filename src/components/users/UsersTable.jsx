import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiRefreshCcw } from "react-icons/fi";

function UsersTable() {
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [loading, setLoading] = useState(false);
  const url = "http://localhost:3000/users"

  async function fetchUsers() {
    setLoading(true);
    try {
      const { data } = await axios.get(`${url}/getall`);
      if (data.success) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      // console.log(users);
    }
  };

  async function handleDeleteUser(id) {
    try {
      const Confirmation = confirm("Are you sure you want to delete?");
      if (Confirmation) {
        const { data } = await axios.delete(`http://localhost:3000/users/delete/${id}`)
        console.log(data)
        if (data.success) {
          console.log("User deleted successfully")
          setRefresh((prev) => !prev);
        }
      }
    } catch (error) {
      console.log(error)
      console.log("User deletion failed")
    }
  };

  async function handleRole(id, newRole) {
    try {
      // console.log(newRole)
      // const Confirmation = confirm("Are you sure you want to change Role?")
      const { data } = await axios.put(`${url}/update-role`, { id, newRole });
      // console.log(data)
      if (data.success) { setRefresh((prev) => !prev) }
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [refresh]);

  // async function handleDelete(id) {
  //   try {
  //     const sure = confirm("Are you sure you want to delete?");
  //     if (sure) {
  //       const { data } = await axios.delete(`http://localhost:3000/users/delete/${id}`);
  //       if (data.success) {
  //         console.log("User deleted successfully");
  //         setRefresh((prev) => !prev);
  //       }
  //     }
  //   } catch (error) {
  //     console.log("Error deleting user:", error);
  //   }
  // }

  // const handleEdit = (data) => {
  //   setsingleUser(data);
  //   setisUserModalOpen(true);
  // };

  // const handleCloseModal = () => {
  //   setsingleUser(null);
  //   setisUserModalOpen(false);
  // };

  // const handleSaveUser = () => {
  //   handleCloseModal();
  // };

  // const handleViewUser = (user) => {
  //   setsingleUser(user);
  //   setIsUserPageOpen(true);
  // };

  // const handleCloseUserPage = () => {
  //   setsingleUser(null);
  //   setIsUserPageOpen(false);
  // };

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
            type="button"
            className="justify-self-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => setRefresh((prev) => !prev)}
          >
            <FiRefreshCcw />
          </button>

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
                {users.map((user) => (
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
                        onClick={() => handleEdit(user)}
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
                        onClick={() => handleViewUser(user)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* <Modal isOpen={isUserModalOpen} onClose={handleCloseModal}>
            <AddUser user={singleUser} setRefresh={setRefresh} onSave={handleSaveUser} />
          </Modal> */}

          {/* {isUserPageOpen && (
            <Modal isOpen={isUserPageOpen} onClose={handleCloseUserPage}>
              <UserPage user={singleUser} />
            </Modal>
          )} */}
        </div>
      )}
    </div>
  );
}

export default UsersTable;
