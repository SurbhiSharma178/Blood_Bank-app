import React, { useEffect, useState } from 'react'
import Layout from '../../components/shared/layout/Layout'
import API from '../../services/API';
import moment from 'moment';

const HospitalList = () => {
  const [data,setData]=useState([]);

  // find donar records
  const getHospitalList= async()=>{
    try {
      const {data}=await API.get('/admin/hospital-List')
      console.log(data)
      if(data?.success){
        setData(data?.hospitalData)
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(()=>{
    getHospitalList();
  },[])

  // DELETE function
  const handelDelete=async(id)=>{
    try {
      let answer = window.prompt("Are you sure you want to delete Hospital","Sure")
      if(!answer) return
      const {data}=await API.delete(`/admin/delete-hospital/${id}`)
      alert(data?.message)
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  }
  

  return (
    <Layout>
      <div className="container mt-4">
     <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">E-Mail Id</th>
                    <th scope="col">Phone No.</th>
                    <th scope="col">Date</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((record) => (
                    <tr key={record._id}>
                      <td>{record.hospitalName}</td>
                      <td>{record.email}</td>
                      <td>{record.phone}</td>
                      <td>{moment(record.createdAt).format('DD/MM/YYYY hh:mm A')}</td>
                      <td>
                        <button className="btn btn-danger" onClick={()=>handelDelete(record._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
    </Layout>
  )
}

export default HospitalList
