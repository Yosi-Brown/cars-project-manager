import React from 'react'
import { useState } from 'react'
import ProductInput from '../components/product/ProductInput'
import axios from 'axios'
import Loading from '../components/loading/Loading'

const url = import.meta.env.VITE_URL

function ShowImage({ product, onClose, setRefresh }) {

  const [handelImage, setHandelImage] = useState(false)
  const [loading, setLoading] = useState(false)

  const changeImage = async (e) => {
    e.preventDefault();
    const newImage = document.getElementById("image").files
    const formData = new FormData();
    formData.append('image', newImage[0])
    try {
      setLoading(true)
      const { data } = await axios({
        method: 'PUT',
        url: `${url}/products/update/${product._id}`,
        data: formData,
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (data.success) {
        console.log(data)
        onClose(false)
        setRefresh(prev => (!prev))
      }
    } catch (data) {
      console.log(data.response.data)
    }
    finally {
      setLoading(false)
    }

  }

  return (
    <>{!loading ?
      <div className='h-[50vh]'>
        <img src={product.image_link} alt={product.model} className='h-[90%]' />
        {handelImage && <ProductInput
          htmlFor="image"
          type="file"
          name="image"
          id="image"
          placeholder="Enter image"
        />}

        {!handelImage ? (<button className="col-span-3 mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => setHandelImage(true)}
        >
          Change Picture</button>) : (<button type='submit' className="col-span-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={(e) => {
              // e.preventDefault()
              changeImage(e)
              setHandelImage(false)
            }
            }

          >
            Save</button>)}</div> : <Loading />}
    </>
  )
}

export default ShowImage