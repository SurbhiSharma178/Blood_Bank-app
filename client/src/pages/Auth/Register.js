import React from 'react'
import Form from '../../components/shared/Form/Form'
import { useSelector } from 'react-redux'
import Spinner from '../../components/shared/Spinner'

const Register = () => {

  const {loading, error}=useSelector(state=>state.auth)
  
  return (
    <>
    {
      error && <span>{alert(error)}</span>
    }
    {
      loading ? <Spinner/> :(
      <div className="row g-0">
      <div className="col-md-7 form-banner">
        <img src="https://mmhrc.in/file/wp-content/uploads/2022/03/blood-donation.jpg" alt="registerImage" />
      </div>
      <div className="col-md-5 form-container">
     < Form formTitle={"Register"} submitButton={"Register"} formType={'register'}/>
      </div>
    </div>
      )
    }

     
    </>
  )
}

export default Register
