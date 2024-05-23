import ProductInput from "./ProductInput";
import axios from "axios";

const url_post = "http://localhost:3000/products/add";
const url_put = "http://localhost:3000/products/update";

function AddProduct({ product, setRefresh, onSave }) {
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
      if (data.success){
        console.log(data)
        setRefresh(prev => !prev)
        onSave()
      }
    
    
      // console.log(data, "car");
    } catch (error) {
      console.log({
        message: error.message
      });
    }
    

  };


  return (
    <>
      <form
        className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4"
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
        <ProductInput
          htmlFor="car_type"
          type="text"
          name="car_type"
          id="car_type"
          placeholder="Enter car type"
          defaultValue={product ? product.car_type : ""}
        />
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
          type="string"
          name="price"
          id="price"
          placeholder="Enter price"
          defaultValue={product ? product.price : ""}
        />
        <ProductInput
          htmlFor="image"
          type="file"
          name="image"
          id="image"
          placeholder="Enter image"
          defaultValue={product ? product.image : ""}
        />

        <button
          type="submit"
          className="col-span-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {product ? "save changes" : "Add Product"}
        </button>
        {/* <button onClick={console.log("jnl", product)}>rg</button> */}
      </form>
    </>
  );
}

export default AddProduct;
