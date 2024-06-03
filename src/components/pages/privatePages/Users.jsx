import React from 'react'
import useFetch from '../../../hooks/useFetch'
import Loading from '../../loading/Loading';
import UsersTable from '../../users/UsersTable';

const url = import.meta.env.VITE_URL;

function Users() {

  const [data, isLoading, isError] = useFetch(`${url}/users/getall`)

  return (
    <>
      {isLoading && <Loading />}
      {/* {!isLoading && !data?.users.length === 0 && <div>have not users yet</div>} */}
      {isError && <div>Error</div>}
      {data && <UsersTable users={data.users} isLoading={isLoading} />}
    </>
  )
}

export default Users