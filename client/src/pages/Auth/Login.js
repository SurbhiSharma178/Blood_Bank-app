import React from 'react'
import Form from '../../components/shared/Form/Form'
import {useSelector} from "react-redux"
import Spinner from '../../components/shared/Spinner'


const Login = () => {

  const {loading,error} =useSelector(state =>state.auth)
 
  return (
    <>
    {
      error && <span>{alert(error)}</span>
    }
    {
      loading ? (<Spinner/> ):(
        <div className="row g-0">
        <div className="col-md-7 form-banner" >
          <img src="./assets/image/banner1.jpg" alt="loginImage" />
        </div>
        <div className="col-md-3 form-container">
          <Form formTitle={"Login Page"} submitButton={"login"} formType={'login'}/>
        </div>
      </div>
      )
    }
    </>
  )
}

export default Login 
