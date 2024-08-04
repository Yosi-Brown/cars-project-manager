import useFetch from "../../hooks/useFetch";
import { toastFire } from "../../utils/Toaster";
import Loading from "../loading/Loading";
import ProductInput from "./ProductInput";
import axios from "axios";
import.meta.env.VITE_URL;

const url_post = `${import.meta.env.VITE_URL}/products/add`;
const url_put = `${import.meta.env.VITE_URL}/products/update`;
const url = import.meta.env.VITE_URL;

function AddProduct({ product, setRefresh, onSave }) {
  const [data, isLoading, isError] = useFetch(`${url}/categories/getall`);
  // console.log(product);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = product ? "PUT" : "POST";
    const url = product ? `${url_put}/${product._id}` : url_post;
    const formData = new FormData(e.target);
    try {
      const { data } = await axios({
        method: method,
        url: url,
        data: formData,
        withCredentials: true
      });
      if (data.success) {
        toastFire(true, data.message);
        setRefresh(prev => !prev);
        onSave();
      }
    } catch (error) {
      console.log(error);
      toastFire(false, error.response.data.error);
    }
  };

  return (
    <>
      <form
        className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 max-h-[80vh] overflow-y-auto"
        onSubmit={handleSubmit}
      >
        <ProductInput
          htmlFor="company"
          type="text"
          id="company"
          name="company"
          placeholder="Enter company name"
          defaultValue={product ? product.company : ""}
        />
        <ProductInput
          htmlFor="model"
          type="text"
          id="model"
          name="model"
          placeholder="Enter car model"
          defaultValue={product ? product.model : ""}
        />
        <ProductInput
          htmlFor="engine_cc"
          type="number"
          id="engine_cc"
          name="engine_cc"
          placeholder="Enter engine cc"
          defaultValue={product ? product.engine_cc : ""}
        />
        <ProductInput
          htmlFor="horsepower"
          type="number"
          id="horsepower"
          name="horsepower"
          placeholder="Enter horsepower"
          defaultValue={product ? product.horsepower : ""}
        />
        <ProductInput
          htmlFor="seats"
          type="number"
          id="seats"
          name="seats"
          placeholder="Enter number of seats"
          defaultValue={product ? product.seats : ""}
        />
        <ProductInput
          htmlFor="colors"
          type="text"
          name="colors"
          id="colors"
          placeholder="Enter colors (separate with ,)"
          defaultValue={product ? product.colors : ""}
        />
        <ProductInput
          htmlFor="engine_type"
          type="text"
          name="engine_type"
          id="engine_type"
          placeholder="Enter engine type"
          defaultValue={product ? product.engine_type : ""}
        />

        {/* <div className="mb-5 col-span-1 sm:col-span-2 md:col-span-3">
          <label htmlFor="categories" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a Category</label>
          <select
            id="categories"
            name="category"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            defaultValue={product ? product.category.name : ""}
          >
            <option hidden>Select a category</option>
            {data && data.categories ? data.categories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            )) : <option>Loading categories...</option>}
            {isError && <option disabled>Error loading categories</option>}
          </select>
        </div> */}
        <div className="mb-5">
          <label htmlFor="categories" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a Category</label>
          <select
            id="categories"
            name="category"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            defaultValue={product ? product.category._id : ""}
          >
            <option hidden value={product ? product.category._id: ''}>
              {product ? product.category.name : 'Select a category'}</option>
            {data && data.categories ? data.categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            // )) : <option> <Loading/> </option>}
             )) : <option>Loading categories...</option>} 
            {isError && <option disabled>Error loading categories</option>}
          </select>
        </div>

        <ProductInput
          htmlFor="year"
          type="number"
          name="year"
          id="year"
          placeholder="Enter year"
          defaultValue={product ? product.year : ""}
        />
        <ProductInput
          htmlFor="price"
          type="number"
          name="price"
          id="price"
          placeholder="Enter price"
          defaultValue={product ? product.price : ""}
        />
        <ProductInput
          htmlFor="discountPrice"
          type="number"
          name="discountPrice"
          id="discountPrice"
          placeholder="Enter discount price"
          defaultValue={product ? product.discountPrice : ""}
        />
        {!product &&
        <ProductInput
          htmlFor="image"
          type="file"
          name="image"
          id="image"
          placeholder="Enter image"
        />
        }

        <button
          type="submit"
          className="col-span-1 sm:col-span-2 md:col-span-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {product ? "Save Changes" : "Add Product"}
        </button>
      </form>
    </>
  );
}

export default AddProduct;
