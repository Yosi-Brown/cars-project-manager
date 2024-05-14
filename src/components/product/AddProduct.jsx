import React, { useState } from 'react';
import ProductInput from './ProductInput';
import axios from 'axios';


const url = 'http://localhost:3000/products/'

function AddProduct() {
  const [formData, setFormData] = useState({
    company: '',
    model: '',
    engine_cc: '',
    horsepower: '',
    seats: '',
    colors: '',
    engine_type: '',
    car_type: '',
    year: '',
    price: '',
    image_link: ''
  });
  console.log(formData)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {

    e.preventDefault();
    sendProduct()
  }
  async function sendProduct() {
    try {
      const add = await axios.post(url, formData, { withCredentials: true })
      console.log(add, 'car')
    } catch (error) {
      console.log({
        message: error.message
      })
    }
  };
  return (
    <>
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <ProductInput
          htmlFor="company"
          type="text"
          id="company"
          name="company"
          placeholder="Enter company name"
          value={formData.company}
          onChange={handleChange}
        />
        <ProductInput
          htmlFor="model"
          type="text"
          id="model"
          name="model"
          placeholder="Enter car model"
          value={formData.model}
          onChange={handleChange}
        />
        <ProductInput
          htmlFor="engine_cc"
          type="text"
          id="engine_cc"
          name="engine_cc"
          placeholder="Enter engine cc"
          value={formData.engine_cc}
          onChange={handleChange}
        />
        <ProductInput
          htmlFor="horsepower"
          type="text"
          id="horsepower"
          name="horsepower"
          placeholder="Enter horsepower"
          value={formData.horsepower}
          onChange={handleChange}
        />
        <ProductInput
          htmlFor="seats"
          type="text"
          id="seats"
          name="seats"
          placeholder="Enter number of seats"
          value={formData.seats}
          onChange={handleChange}
        />
        <ProductInput
          htmlFor='colors'
          type="text"
          name="colors"
          id="colors"
          placeholder="Enter colors (separate with ,)"
          value={formData.colors}
          onChange={handleChange}
        />
        <ProductInput
          htmlFor='engine_type'
          type="text"
          name="engine_type"
          id="engine_type"
          placeholder="Enter engine type"
          value={formData.engine_type}
          onChange={handleChange}
        />
        <ProductInput
          htmlFor='car_type'
          type="text"
          name="car_type"
          id="car_type"
          placeholder="Enter car type"
          value={formData.car_type}
          onChange={handleChange}
        />
        <ProductInput
          htmlFor='year'
          type="text"
          name="year"
          id="year"
          placeholder="Enter year"
          value={formData.year}
          onChange={handleChange}
        />
        <ProductInput
          htmlFor='price'
          type="text"
          name="price"
          id="price"
          placeholder="Enter price"
          value={formData.price}
          onChange={handleChange}
        />
        <ProductInput
          htmlFor='image_link'
          type="text"
          name="image_link"
          id="image_link"
          placeholder="Enter image link"
          value={formData.image_link}
          onChange={handleChange}
        />
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Add Product
        </button>
      </form>
    </>
  );
};

export default AddProduct;