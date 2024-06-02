import React from 'react'
import useFetch from '../../../hooks/useFetch'
import Loading from '../../loading/Loading'
import ProductTable from '../../product/productTable/ProductTable'
const url = import.meta.env.VITE_URL;



function Products() {

  const [data, isLoading, isError] = useFetch(`${url}/products/getall`)

  return (<>
    {isLoading && <Loading />}
    {/* {!isLoading && !data?.users.length === 0 && <div>have not users yet</div>} */}
    {isError && <div>Error</div>}
    {data && <ProductTable products={data.products} isLoading={isLoading} />}
  </>
  )
}

export default Products