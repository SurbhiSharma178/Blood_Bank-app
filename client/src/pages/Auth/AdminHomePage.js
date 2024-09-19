import React from 'react'
import Layout from '../../components/shared/layout/Layout'
import { useSelector } from 'react-redux'

const AdminHomePage = () => {
  const {User}=useSelector(state=>state.auth)
  return (
    <Layout>
     <div className="container">
      <div className="d-flex flex-column mt-4">
        <h1>
          Welcome Admin <i className='text-success'>{User?.name}</i>
        </h1>
        <h4>Manage Blood Bank App</h4>
        <hr />
      </div>
     </div>
    </Layout>
  )
}

export default AdminHomePage
