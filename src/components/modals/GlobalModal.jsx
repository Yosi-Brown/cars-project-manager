import React from 'react'


function GlobalModal({ children, isOpen, onClose }) {

  if(!isOpen) return null

  return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative h-1/2 bg-white rounded shadow-lg w-auto max-h-screen max-w-full mx-auto dark:bg-gray-900 ">
          <button
            className="z-50 absolute top-2 right-2 text-xl hover:bg-blue-800 dark:text-white"
            onClick={() => onClose(false)}>
            ✕

          </button>
          <div className='h-full'>
          {children}
          </div>
        </div>
      </div>
  );
}

export default GlobalModal;