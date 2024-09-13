import React, { useEffect, useState } from 'react'
import Layout from '../components/shared/layout/Layout'
import API from '../services/API';
import moment from 'moment';
import { useSelector } from 'react-redux';

const Donation = () => {
  const {User}=useSelector(state=>state.auth)
  const [data,setData]=useState([]);

  // find donar records
  const getDonations= async()=>{
    try {
      const {data}=await API.post('/inventory/get-inventory-hospital',{
        filters:{
          inventoryType:'in',
          donar:User?._id
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
    getDonations();
  },[]) 

  return (
    <>
    <Layout>
      <div className="container">
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

export default Donation
