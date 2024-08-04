// import React from 'react';
// import { IoIosStar, IoIosStarOutline } from 'react-icons/io';

// const ProductPage = ({ product }) => {
//   if (!product) {
//     return null;
//   }

//   const { company, model, engine_displacement_cc, horsepower, seats, colors, engine_type, car_type, year, price, image_link, rating } = product;

//   return (
//     <div className="w-full max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6">
//       <img className="w-full h-64 object-cover rounded-t-lg" src={image_link} alt={`${company} ${model}`} />
//       <div className="mt-4">
//         <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{company} {model}</h2>
//         <p className="text-gray-700 dark:text-gray-300">{car_type} - {year}</p>
//         <p className="mt-2 text-gray-700 dark:text-gray-300">{price}</p>
//         <div className="mt-4">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Specifications:</h3>
//           <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
//             <li>Engine Displacement: {engine_displacement_cc} cc</li>
//             <li>Horsepower: {horsepower} HP</li>
//             <li>Seats: {seats}</li>
//             <li>Engine Type: {engine_type}</li>
//             <li>Colors: {colors.join(", ")}</li>
//           </ul>
//         </div>
//         {rating && (
//           <div className="flex items-center mt-4">
//             <div className="flex items-center space-x-1 rtl:space-x-reverse">
//               {[...Array(Math.floor(rating))].map((_, i) => (
//                 <IoIosStar key={i} className="w-4 h-4 text-yellow-300" />
//               ))}
//               {[...Array(5 - Math.floor(rating))].map((_, i) => (
//                 <IoIosStarOutline key={i} className="w-4 h-4 text-yellow-300" />
//               ))}
//             </div>
//             <span className="ml-2 text-gray-700 dark:text-gray-300">{rating}</span>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductPage;

import React, { useContext, useState } from "react";

function ProductPage({ product, isOpen, onClose }) {
  const [isHovering, setIsHovering] = useState(false);
  const [isOpenPicture, setIsOpenPicture] = useState(false);
  const [isImageScaled, setIsImageScaled] = useState(false);

  if (!isOpen) return null;

  const handleOpenPicture = () => {
    setIsOpenPicture(true);
    setTimeout(() => setIsImageScaled(true), 10); // To ensure transition works
  };

  const handleClosePicture = () => {
    setIsImageScaled(false);
    setTimeout(() => setIsOpenPicture(false), 500); // Duration should match the transition
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 overflow-auto">
      <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-lg w-10/12 max-h-full md:max-h-80vh mx-auto p-4 md:p-6 overflow-auto">
        <button
          className="absolute top-4 right-4 text-white bg-gray-800 dark:bg-gray-600 rounded-full p-2 hover:bg-gray-700 dark:hover:bg-gray-500 transition duration-300 ease-in-out z-50"
          onClick={onClose}
        >
          ✕
        </button>
        <div className="flex flex-col md:flex-row -mx-2 md:-mx-4 max-h-full overflow-auto">
          <div className="md:flex-1 px-2 md:px-4">
            <div
              className="h-56 md:h-[300px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4 overflow-hidden relative"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <img
                className="w-full h-full object-cover"
                src={product.image_link}
                alt="Product Image"
              />
              {isHovering && (
                <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center">
                  <button
                    className="text-white bg-gray-800 dark:bg-gray-600 rounded-full p-2 hover:bg-gray-700 dark:hover:bg-gray-500 transition duration-300 ease-in-out"
                    onClick={handleOpenPicture}
                  >
                    View Full Image
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="md:flex-1 p-6 space-y-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {product.company} {product.model}
            </h1>
            <div className="text-gray-700 dark:text-gray-300 space-y-1">
              <div>
                <span className="font-bold">Company:</span> {product.company}
              </div>
              <div>
                <span className="font-bold">Model:</span> {product.model}
              </div>
              <div>
                <span className="font-bold">Engine Displacement (cc):</span>{" "}
                {product.engine_displacement_cc}
              </div>
              <div>
                <span className="font-bold">Horsepower:</span>{" "}
                {product.horsepower}
              </div>
              <div>
                <span className="font-bold">Seats:</span> {product.seats}
              </div>
              <div>
                <span className="font-bold">Engine Type:</span>{" "}
                {product.engine_type}
              </div>
              <div>
                <span className="font-bold">Car Type:</span>{" "}
                {product.category.name}
              </div>
              <div>
                <span className="font-bold">Year:</span> {product.year}
              </div>
            </div>
          </div>
        </div>
        {isOpenPicture && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 transition-opacity duration-500 ease-in-out">
            <div
              className={`relative w-full h-full flex items-center justify-center transition-transform duration-500 ease-in-out 
                ${isImageScaled ? "scale-100" : "scale-75"}`}
            >
              <img
                className="w-full h-full object-contain"
                src={product.image_link}
                alt="Product Image Full Screen"
              />
              <button
                className="absolute top-4 right-4 text-white bg-gray-800 dark:bg-gray-600 rounded-full p-2 hover:bg-gray-700 dark:hover:bg-gray-500 transition duration-300 ease-in-out"
                onClick={handleClosePicture}
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductPage;
