import React, { useEffect, useState } from 'react'
import Header from '../../components/shared/layout/Header'
import API from "./../../services/API"
import moment from 'moment'

const Analytics = () => {
  const [data, setData] = useState([])
  const [inventoryData,setInventoryData]=useState([])
  const  colors=['#4F75FF',"#5B99C2","#7C93C3","#78B7D0","#3FA2F6","#028391","#4B70F5","#1679AB"]

  // Get Blood Group Data
  const getBloodGroupData = async () => {
    try {
      const { data } = await API.get('/analytics/bloodGroup-data')
      console.log(data);
      if (data?.success) {
        setData(data?.bloodGroupData)
        console.log(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  // lifecycle methode
  useEffect(() => {
    getBloodGroupData()
  }, [])

  const getRecentBloodRecord = async () => {
    try {
      const { data } = await API.get('/inventory/get-recentInventory');
      if (data?.success) {
        const inventory = data.inventory;
        if (Array.isArray(inventory)) {
          setInventoryData(inventory);
        } else {
          setInventoryData([inventory]);
        }
      }
    } catch (error) {
      console.log('Error: ' + error.message);
    }
  };
// console.log(data);

  useEffect(() => {
    getRecentBloodRecord();
  }, []);
  return (
    <>
      <Header />
      <div className="d-flex flex-row flex-wrap">
        {
          data?.map((record,i) => ( 
            <div className="card m-2 p-1" key={i} style={{ width: '18rem', backgroundColor:`${colors[i]}` }}>
              <div className="card-body">
                <h1 className="card-title bg-light text-dark text-center mb-3">{record.bloodGroup}</h1>
                <p className="card-text">
                  Total In : <b>{record.totalIn}</b> (ML)
                </p>
                <p className="card-text">
                  Total Out : <b>{record.totalOut}</b> (ML)
                </p>
              </div>
              <div className="card-footer text-light bg-dark text-center">
              Available Blood: <b>{record.availableBlood}</b> (ML)
              </div>
            </div>
          ))
        }
      </div>
      <div className="container my-3 ">
        <h2 className='m-3 bg-dark text-light'>Recent Blood Transactions</h2>
      <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Blood Group</th>
                    <th scope="col">Inventory Type</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Donar Email</th>
                    <th scope="col">Date & Time</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryData?.map((record) => (
                    <tr key={record._id}>
                      <td>{record.bloodGroup}</td>
                      <td>{record.inventoryType}</td>
                      <td>{record.quantity} (ML)</td>
                      <td>{record.email}</td>
                      <td>{moment(record.createdAt).format('DD/MM/YYYY hh:mm A')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
      </div>
    </>
  )
}

export default Analytics
