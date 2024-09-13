import React, { useEffect, useState } from 'react'
import Layout from '../../components/shared/layout/Layout'
import API from '../../services/API';
import moment from 'moment'

const Donar = () => {

  const [data,setData]=useState([]);

  // find donar records
  const getDonars= async()=>{
    try {
      const {data}=await API.get('/inventory/get-donars')
      console.log(data)
      if(data?.success){
        setData(data?.donars)
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(()=>{
    getDonars();
  },[])


  return (
    <Layout>
      <div className="container">
     <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">E-Mail Id</th>
                    <th scope="col">Phone No.</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((record) => (
                    <tr key={record._id}>
                      <td>{record.name || record.OrganisationName + "(Org)"}</td>
                      <td>{record.email}</td>
                      <td>{record.phone}</td>
                      <td>{moment(record.createdAt).format('DD/MM/YYYY hh:mm A')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
    </Layout>
  )
}

export default Donar
