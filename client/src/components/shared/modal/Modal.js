import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import InputType from './../Form/InputType'
import API from './../../../services/API'

const Modal = () => {
  const [inventoryType, setInventoryType] = useState('in')
  const [bloodGroup, setBloodGroup] = useState(' ')
  const [quantity, setQuantity] = useState(0)
  const [email, setEmail] = useState(' ')
  // const [Organisation, setOrganisation] = useState(' ')
  // const [hospital, setHospital] = useState('')
  // const [donar, setDonar] = useState('')

  const { User } = useSelector(state => state.auth)

  const handelModelSubmit = async () => {
    try {
      if (!bloodGroup || !quantity) {
        return alert("Please Provide All fields")
      }
      console.log(User?.role);
      console.log(inventoryType);


      if (User?.role === 'donar' && (inventoryType === 'out')) {
        return alert('Donar cannot dispatch blood ')
      }
      const { data } = await API.post('/inventory/create-inventory', {
        email,
        Organisation: User?._id,
        inventoryType,
        bloodGroup,
        quantity,
      })
      if (data?.success) {
        alert("New Record Created")
        window.location.reload();
      }
    } catch (error) {
      alert(error.response.data.message)
      console.log(error);
      window.location.reload();
    }

  }


  return (
    <>
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Manage Blood Record</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="d-flex mb-3">
                Blood Type: &nbsp;
                <div className="form-check ms-3">
                  <input
                    type="radio"
                    name='inRadio'
                    defaultChecked
                    value={'in'}
                    onChange={(e) => setInventoryType(e.target.value)}
                    className="form-check-input" />
                  <label htmlFor='in' className='form-check-lable'>IN</label>
                </div>
                <div className="form-check ms-3">
                  <input
                    type="radio"
                    name='inRadio'
                    value={'out'}
                    onChange={(e) => setInventoryType(e.target.value)}
                    className="form-check-input" />
                  <label htmlFor='out' className='form-check-lable'>OUT</label>
                </div>
              </div>
              <select className="form-select mb-3"
                aria-label="Default select example"
                onChange={(e) => setBloodGroup(e.target.value)}>
                <option defaultValue='true'>Open this to select Blood group </option>
                <option value={"O+"}>O+</option>
                <option value={"O-"}>O-</option>
                <option value={"AB+"}>AB+</option>
                <option value={"AB-"}>AB-</option>
                <option value={"B+"}>B+</option>
                <option value={"B-"}>B-</option>
                <option value={"A+"}>A+</option>
                <option value={"A-"}>A-</option>
              </select>
              
                <InputType
                  lableText={'Donar Email'}
                  lableFor={'DonarEmail'}
                  inputType={"email"}
                  value={email}
                  onchange={(e) => setEmail(e.target.value)}
                />

              <InputType lableText={'Quantity (ML)'}
                lableFor={'quantity'}
                inputType={"Number"}
                value={quantity}
                onchange={(e) => setQuantity(e.target.value)} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handelModelSubmit}
              >Submit</button>
            </div>


          </div>
        </div>
      </div>
    </>
  )
}

export default Modal
