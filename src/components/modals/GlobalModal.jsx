import React from 'react'


function GlobalModal({ children, isOpen, onClose }) {

  if(!isOpen) return null

  return (
    // <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">

     <div className="z-50 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative bg-white rounded shadow-lg w-auto max-h-screen max-w-full mx-auto dark:bg-gray-900 ">
          <button
            className="z-10 absolute top-2 right-2 text-xl hover:bg-blue-800 dark:text-white"
            // className="absolute top-2 right-2 text-xl hover:bg-blue-800 dark:text-white"
            onClick={() => onClose(false)}>
            ✕

          </button>
        {/* <div className="relative bg-white p-5 rounded shadow-lg w-full max-w-2xl mx-auto dark:bg-gray-900 "> */}

          <div>
          {children}
          </div>
          
        </div>
      </div>
  );
}

export default GlobalModal;