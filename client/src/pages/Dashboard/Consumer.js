import moment from 'moment'
import React, { useEffect, useState } from 'react'
import API from '../../services/API';
import Layout from '../../components/shared/layout/Layout';
import { useSelector } from 'react-redux';

const Consumer = () => {
  const {User}=useSelector(state=>state.auth)
  const [data,setData]=useState([]);

  // find donar records
  const getConsumer= async()=>{
    try {
      const {data}=await API.post('/inventory/get-inventory-hospital',{
        filters:{
         inventoryType:'out',
         hospital:User?._id,
        }
      })
      console.log(data)
      if(data?.success){
        setData(data?.inventory)
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(()=>{
    getConsumer()
  },[])

  return (
    <>
      <Layout>
        <div className="container mt-4">
     <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Blood Group</th>
                    <th scope="col">Inventory Type</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">E-Mail</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((record) => (
                    <tr key={record._id}>
                      <td>{record.bloodGroup}</td>
                      <td>{record.inventoryType}</td>
                      <td>{record.quantity}</td>
                      <td>{record.email}</td>
                      <td>{moment(record.createdAt).format('DD/MM/YYYY hh:mm A')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
    </Layout>
    </>
  )
}

export default Consumer
