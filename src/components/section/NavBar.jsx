import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from '../../contexts/AuthContext';
import { MdOutlineDarkMode } from "react-icons/md";
import { IoSunny } from "react-icons/io5";
import { ImProfile } from "react-icons/im";
import GlobalModal from '../modals/GlobalModal';
import RegisterForm from '../registerUser/RegisterForm';



function Navbar() {
  const { logOut, currentUser } = useContext(AuthContext);
  const [darkMode, setDarkMode] = useState(false);
  const [handelModalOpen, setHandelModalOpen] = useState(false) 

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark');
  };

  const handleEditUser = (bool, user = null) => {
    // setSingleUser(user)
    setHandelModalOpen(bool)
  };

  const menuItems = (
    <>
      <li><Link to="/products">Products</Link></li>
      <li><Link to="/orders">Orders</Link></li>
      <li><Link to="/users">Users</Link></li>
    </>
  );

  return (
    <nav className="navbar  bg-yellow-300 dark:bg-fuchsia-600 ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {menuItems}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">CARS4U</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {menuItems}
        </ul>
      </div>
      <div className="navbar-end">
        <button className="btn dark:bg-gray-700 dark:text-gray-100 dark:border-gray-500" onClick={() => {
          handleEditUser(true)
          }}><ImProfile /></button>
        <button className="btn dark:bg-gray-700 dark:border-gray-500 dark:text-white" onClick={toggleDarkMode}>{darkMode ? <IoSunny /> : <MdOutlineDarkMode />
        }</button>
        <button className="btn dark:bg-gray-700 dark:text-gray-100 dark:border-gray-500" onClick={logOut}>Log out</button>
      </div>
      {handelModalOpen &&
            <GlobalModal isOpen={handelModalOpen} onClose={handleEditUser}>
              <RegisterForm user={currentUser} selfEdit={true} onClose={handleEditUser}/>
            </GlobalModal>
          }
    </nav>
  );
}

export default Navbar;