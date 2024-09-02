import React from 'react'
import Form from '../../components/shared/Form/Form'


const Login = () => {
 
  return (
    <>
      <div className="row">
        <div className="col-md-7 form-banner" >
          <img src="./assets/image/banner1.jpg" alt="loginImage" />
        </div>
        <div className="col-md-3 form-container">
          <Form formTitle={"Login Page"} submitButton={"login"} formType={'login'}/>
        </div>
      </div>
    </>
  )
}

export default Login 
