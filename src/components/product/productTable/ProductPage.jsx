// src/components/product/ProductPage.jsx
import React from 'react';
import { IoIosStar, IoIosStarOutline } from 'react-icons/io';

const ProductPage = ({ product }) => {
  if (!product) {
    return null;
  }

  const { company, model, engine_displacement_cc, horsepower, seats, colors, engine_type, car_type, year, price, image_link, rating } = product;

  return (
    <div className="w-full max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6">
      <img className="w-full h-64 object-cover rounded-t-lg" src={image_link} alt={`${company} ${model}`} />
      <div className="mt-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{company} {model}</h2>
        <p className="text-gray-700 dark:text-gray-300">{car_type} - {year}</p>
        <p className="mt-2 text-gray-700 dark:text-gray-300">{price}</p>
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Specifications:</h3>
          <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
            <li>Engine Displacement: {engine_displacement_cc} cc</li>
            <li>Horsepower: {horsepower} HP</li>
            <li>Seats: {seats}</li>
            <li>Engine Type: {engine_type}</li>
            <li>Colors: {colors.join(", ")}</li>
          </ul>
        </div>
        {rating && (
          <div className="flex items-center mt-4">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              {[...Array(Math.floor(rating))].map((_, i) => (
                <IoIosStar key={i} className="w-4 h-4 text-yellow-300" />
              ))}
              {[...Array(5 - Math.floor(rating))].map((_, i) => (
                <IoIosStarOutline key={i} className="w-4 h-4 text-yellow-300" />
              ))}
            </div>
            <span className="ml-2 text-gray-700 dark:text-gray-300">{rating}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
