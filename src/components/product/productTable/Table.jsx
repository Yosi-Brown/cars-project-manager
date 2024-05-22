import axios from 'axios'
import React, { useEffect, useState } from 'react'


function Table() {
  const[ products, setProducts ] = useState([])
  const url = 'http://localhost:3000/products/getall'
  
  const fetchData = async () => {
    try {
      const { data } = await axios.get(url,{withCredentials:true})
      if(data.success){
        setProducts(data.products)
        // console.log(products)
      }

    } catch (error) {
      console.log(error)
    }
    // console.log(products)
  }
  useEffect(() => {
    
    fetchData()

  },[])
  
  // console.log(data.products)
  return (
    <div className="relative w-[80%] mx-auto overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm h-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Company</th>
            <th scope="col" className="px-6 py-3">Model</th>
            {/* <th scope="col" className="px-6 py-3">Engine Displacement</th> */}
            {/* <th scope="col" className="px-6 py-3">Horsepower</th> */}
            {/* <th scope="col" className="px-6 py-3">Seats</th> */}
            <th scope="col" className="px-6 py-3">Colors</th>
            {/* <th scope="col" className="px-6 py-3">Engine Type</th> */}
            <th scope="col" className="px-6 py-3">Car Type</th>
            <th scope="col" className="px-6 py-3">Year</th>
            <th scope="col" className="px-6 py-3">Price</th>
            <th scope="col" className="px-6 py-3">Image</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              <td className="px-6 py-4">{product.company}</td>
              <td className="px-6 py-4">{product.model}</td>
              {/* <td className="px-6 py-4">{product.engine_displacement_cc} cc</td> */}
              {/* <td className="px-6 py-4">{product.horsepower} HP</td> */}
              {/* <td className="px-6 py-4">{product.seats}</td> */}
              <td className="px-6 py-4">{product.colors.join(', ')}</td>
              {/* <td className="px-6 py-4">{product.engine_type}</td> */}
              <td className="px-6 py-4">{product.car_type}</td>
              <td className="px-6 py-4">{product.year}</td>
              <td className="px-6 py-4">{product.price}</td>
              <td className="px-6 py-4">
                <img width={60} height={60} src={product.image_link} alt={product.model} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

}

export default Table