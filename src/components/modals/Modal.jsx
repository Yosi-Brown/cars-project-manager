import React from 'react';



const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;  // אם isOpen הוא false, המודאל לא יוצג

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white p-5 rounded shadow-lg w-full max-w-2xl mx-auto dark:bg-gray-900 ">
        <button className="absolute top-2 right-2 text-xl hover:bg-blue-800 dark:text-white" onClick={onClose}>✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;