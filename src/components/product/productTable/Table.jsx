import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Table() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/products/getall');
        if (data.success) {
          setProducts(data.products);
        } 
        // else {
        //   console.error(data.message);
        // }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  async function handleDelete(id){
    try {
      const { data } = await axios.delete('http://localhost:3000/products/delete/${id}');
      if (data.success){
      console.log("deleted")
      setProducts(products.filter(product => product._id !== id));
      // fetchProducts()
    }

      else{
        console.log("wdfqwf")
      }
      
    } catch (error) {
      // console.log(error)
      console.log("not deleted")
      
    }
  }
  
  const handleEdit = async (data) => {
    try {
      // const { data } = await axios.put(http://localhost:3000/products/update/${id});
      console.log('Edit product with ID:', `${data}`);
      
      
      
    } catch (error) {
      
    }
  };




  return (
    <div>
      <div className="relative w-[80%] mx-auto overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm h-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Company</th>
              <th scope="col" className="px-6 py-3">Model</th>
              <th scope="col" className="px-6 py-3">Colors</th>
              <th scope="col" className="px-6 py-3">Car Type</th>
              <th scope="col" className="px-6 py-3">Year</th>
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3">Image</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <td className="px-6 py-4">{product.company}</td>
                <td className="px-6 py-4">{product.model}</td>
                <td className="px-6 py-4">{product.colors.join(', ')}</td>
                <td className="px-6 py-4">{product.car_type}</td>
                <td className="px-6 py-4">{product.year}</td>
                <td className="px-6 py-4">{product.price}</td>
                <td className="px-6 py-4">
                  <img width={60} height={60} src={product.image_link} alt={product.model} />
                </td>
                <td className="px-6 py-4 flex space-x-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600" onClick={ () => handleEdit(product) } >Edit</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600" onClick={ () => handleDelete(product._id) }>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <footer>
        <button onClick={() => console.log(products)} className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 mt-4">
          Print Products
        </button>
      </footer> */}
    </div>
  );
}

export default Table;