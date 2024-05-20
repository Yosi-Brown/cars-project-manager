import ProductInput from './ProductInput';
import axios from 'axios';

const url = 'http://localhost:3000/'

function AddProduct() {

  const data = document.querySelector("form")
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(data);
      const add = await axios.post(`${url}products/add`, formData,
        // {'content-type': 'multipart/form-data'},
        { withCredentials: true })
      console.log(add, 'car')
    } catch (error) {
      console.log({
        message: error.message
      })
    }
  }

  return (
    <>
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <ProductInput
          htmlFor="company"
          type="text"
          id="company"
          name="company"
          placeholder="Enter company name"
        />
        <ProductInput
          htmlFor="model"
          type="text"
          id="model"
          name="model"
          placeholder="Enter car model"
        />
        <ProductInput
          htmlFor="engine_cc"
          type="number"
          id="engine_cc"
          name="engine_cc"
          placeholder="Enter engine cc"
        />
        <ProductInput
          htmlFor="horsepower"
          type="number"
          id="horsepower"
          name="horsepower"
          placeholder="Enter horsepower"
        />
        <ProductInput
          htmlFor="seats"
          type="number"
          id="seats"
          name="seats"
          placeholder="Enter number of seats"
        />
        <ProductInput
          htmlFor='colors'
          type="text"
          name="colors"
          id="colors"
          placeholder="Enter colors (separate with ,)"
        />
        <ProductInput
          htmlFor='engine_type'
          type="text"
          name="engine_type"
          id="engine_type"
          placeholder="Enter engine type"
        />
        <ProductInput
          htmlFor='car_type'
          type="text"
          name="car_type"
          id="car_type"
          placeholder="Enter car type"
        />
        <ProductInput
          htmlFor='year'
          type="number"
          name="year"
          id="year"
          placeholder="Enter year"
        />
        <ProductInput
          htmlFor='price'
          type="number"
          name="price"
          id="price"
          placeholder="Enter price"
        />
        <ProductInput
          htmlFor='image'
          type="file"
          name="image"
          id="image"
          placeholder="Enter image"
        />
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Add Product
        </button>
      </form>
    </>
  );
};

export default AddProduct;