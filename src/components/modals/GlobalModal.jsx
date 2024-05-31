import React from 'react'

// function GlobalModal() {
function GlobalModal({ children, isOpen, onClose }) {
  // const modal = document.getElementById('global_modal')
  // console.log(children)
  if(!isOpen) return null

  return (
      <div className=" fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative bg-white p-5 rounded shadow-lg h-auto w-auto max-h-full max-w-full mx-auto dark:bg-gray-900 ">
          <button
            className="absolute top-2 right-2 text-xl hover:bg-blue-800 dark:text-white"
            onClick={() => onClose(false)}>
            ✕

          </button>
          {children}
        </div>
      </div>
  );
}

export default GlobalModal