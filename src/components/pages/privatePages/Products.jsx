import React, {useEffect ,useState } from 'react'
import useFetch from '../../../hooks/useFetch'
import Loading from '../../loading/Loading'
import ProductTable from '../../product/productTable/ProductTable'
import Pagination from '../../common/Pagination';
const url = import.meta.env.VITE_URL;


function Products() {

  const [data, isLoading, isError] = useFetch(`${url}/products/getall`);

  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage] = useState(8)


  const indexOfLastProduct = currentPage * productPerPage; //17
  const indexOfFirstProduct = indexOfLastProduct - productPerPage; //17-3
  const currentProducts = data?.products.slice(indexOfFirstProduct, indexOfLastProduct);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <>
      {isLoading && <Loading />}
      {/* {!isLoading && !data?.users.length === 0 && <div>have not users yet</div>} */}
      {isError && <div>{isError}</div>}
      {/* {data && <ProductTable products={data.products} isLoading={isLoading} />} */}
      {data && <ProductTable products={currentProducts} isLoading={isLoading} />}
      {data && <Pagination 
      productPerPage={productPerPage}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      totalProduct={data.products.length}
      />}
    </>
  )
}

export default Products