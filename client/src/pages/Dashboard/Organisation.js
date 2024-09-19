import React, { useEffect, useState } from 'react'
import Layout from '../../components/shared/layout/Layout'
import API from '../../services/API';
import moment from 'moment';
import { useSelector } from 'react-redux';

const Organisation = () => {
  // get current user
  const {User}=useSelector(state=>state.auth)
  const [data, setData] = useState([]);

  const getOrganisation = async () => {
    try {
      if(User?.role==='donar'){
        const { data } = await API.get('/inventory/get-organisation');
        console.log(data);
        if (data?.success) {
          setData(data?.organisations)
        }
      }
      if(User?.role==='hospital'){
        const { data } = await API.get('/inventory/get-organisation-for-hospital');
        // console.log(data);
        if (data?.success) {
          setData(data?.organisations)
        }
      }
     
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getOrganisation();
  }, [User])
  return (
    <Layout>
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
              <td>{record.name || record.OrganisationName +'ORG' }</td>
              <td>{record.email}</td>
              <td>{record.phone}</td>
              <td>{moment(record.createdAt).format('DD/MM/YYYY hh:mm A')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  )
}

export default Organisation
