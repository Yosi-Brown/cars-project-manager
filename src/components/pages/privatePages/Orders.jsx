import React from 'react'
import useFetch from '../../../hooks/useFetch';
import Loading from '../../loading/Loading';
import OrdersTable from '../../orders/OrdersTable';
const url = import.meta.env.VITE_URL;

function Orders() {

  const [data, isLoading, isError] = useFetch(`${url}/orders/getall`)

  return (
  <>
    {isLoading && <Loading />}
    {/* {!isLoading && !data?.users.length === 0 && <div>have not users yet</div>} */}
    {isError && <div>Error</div>}
    {data && <OrdersTable orders={data.orders} isLoading={isLoading} />}
  </>
  )
}

export default Orders