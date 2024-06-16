import React from 'react'
import useFetch from '../../../hooks/useFetch';
import Loading from '../../loading/Loading';
import CategoriesTable from '../../categories/CategoriesTable';
const url = import.meta.env.VITE_URL;


function Categories() {

  const [data, isLoading, isError] = useFetch(`${url}/categories/getall`)

  return (
    <div className='inline-flex mt-3'>
      {isLoading && <Loading />}
      {/* {!isLoading && !data?.users.length === 0 && <div>have not users yet</div>} */}
      {isError && <div>Error</div>}
      {data && <CategoriesTable categories={data.categories} isLoading={isLoading} />}
      </div>
  )
}

export default Categories