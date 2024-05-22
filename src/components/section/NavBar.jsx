import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from '../../contexts/AuthContext';


function NavBar() {
  const { logOut } = useContext(AuthContext);

  const menuItems = (
    <>
      <li><Link to="/allProducts">Products</Link></li>
      <li>
        <details>
          <summary>Parent</summary>
          <ul className="p-2 z-10">
            <li><Link to="/submenu1">Submenu 1</Link></li>
            <li><Link to="/submenu2">Submenu 2</Link></li>
          </ul>
        </details>
      </li>
      <li><Link to="/item3">Item 3</Link></li>
    </>
  );

  return (
    <div className="navbar bg-base-100">
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
        <button className="btn" onClick={logOut}>Log out</button>
      </div>
    </div>
  );
}

export default NavBar;