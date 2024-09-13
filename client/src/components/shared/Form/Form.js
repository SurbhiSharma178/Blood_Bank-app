import React, { useState } from 'react'
import InputType from './InputType'
import { NavLink } from 'react-router-dom'
import { handleLogin, handleRegister } from '../../../services/AuthService';

const Form = ({ formType, submitButton, formTitle }) => {

  const [email, setEmail] = useState(" ");
  const [password, setPaswword] = useState('');
  const [role, setRole] = useState('donar');
  const [name, setName] = useState('');
  const [OrganisationName, setOrganisationName] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [website, setWebsite] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');


  return (
    <>
      <form onSubmit={(e) => {
        if (formType === 'login') return handleLogin(e, email, password, role)
        else if (formType === 'register') return handleRegister(e, name, role, email, password, OrganisationName, hospitalName, website, address, phone)
      }}>
        <h1 className='text-center'>{formTitle}</h1>
        <hr />
        <div className="d-flex mb-3">
          <div className="form-check">
            {/* donar */}
            <input type="radio" className='form-check-input'
              name='role'
              value={"donar"}
              id='donarRadio'
              onChange={(e) => { setRole(e.target.value) }}
              defaultChecked />
            <label htmlFor="donarRadio" className='form-check-lable'>
              Donar
            </label>
          </div>

          {/* Admin */}
          <div className="form-check ms-2">
            <input type="radio" className='form-check-input'
              name='role'
              value={'Admin'}
              id='AdminRadio'
              onChange={(e) => { setRole(e.target.value) }} />
            <label htmlFor="AdminRadio" className='form-check-lable'>
              Admin
            </label>
          </div>

          {/* Hospital */}
          <div className="form-check ms-2">
            <input type="radio" className='form-check-input'
              name='role'
              value={'hospital'}
              id='hospitalRadio'
              onChange={(e) => { setRole(e.target.value) }} />
            <label htmlFor="hospitalRadio" className='form-check-lable'>
              Hospital
            </label>
          </div>

          <div className="form-check ms-2">
            <input type="radio" className='form-check-input'
              name='role'
              value={"Organisation"}
              id='OrganisationRadio'
              onChange={(e) => { setRole(e.target.value) }} />
            <label htmlFor="OrganisationRadio" className='form-check-lable'>
              Organisation
            </label>
          </div>
        </div>

        {/* Switch Case */}
        {(() => {
          switch (true) {
            case formType === 'login': {
              return (
                <>
                  <InputType lableText={"E-Mail"}
                    lableFor={"foremail"}
                    inputType={"email"}
                    name={"E-Mail"}
                    value={email}
                    onchange={(e) => {
                      setEmail(e.target.value)
                    }}
                  />
                  <InputType lableText={"Password"}
                    lableFor={"forPassword"}
                    inputType={"password"}
                    name={"Password"}
                    value={password}
                    onchange={(e) => {
                      setPaswword(e.target.value)
                    }
                    } />
                </>
              )
            }
            case formType === 'register': {
              return (
                <>
                 {
                    role === "donar" && (
                      <InputType lableText={"Name"}
                        lableFor={"forName"}
                        inputType={"text"}
                        name={"name"}
                        value={name}
                        onchange={(e) => {
                          setName(e.target.value)
                        }
                        } />
                    )
                  }

                  {
                    (  role === "Admin") && 
                      <InputType lableText={"Name"}
                        lableFor={"forName"}
                        inputType={"text"}
                        name={"name"}
                        value={name}
                        onchange={(e) => {
                          setName(e.target.value)
                        }
                        } />
                    
                  }
                  {
                    role === 'Organisation' && (
                      <InputType lableText={"Organisation Name"}
                        lableFor={"forOrganisationName"}
                        inputType={"text"}
                        name={"OrganisationName"}
                        value={OrganisationName}
                        onchange={(e) => {
                          setOrganisationName(e.target.value)
                        }} />
                    )
                  }

                  {
                    role === 'hospital' && (
                      <InputType lableText={"Hospital Name"}
                        lableFor={"forhospitalName"}
                        inputType={"text"}
                        name={"hospitalName"}
                        value={hospitalName}
                        onchange={(e) => {
                          setHospitalName(e.target.value)
                        }} />
                    )
                  }


                  <InputType lableText={"E-Mail"}
                    lableFor={"foremail"}
                    inputType={"email"}
                    name={"E-Mail"}
                    value={email}
                    onchange={(e) => {
                      setEmail(e.target.value)
                    }}
                  />
                  <InputType lableText={"Password"}
                    lableFor={"forPassword"}
                    inputType={"password"}
                    name={"Password"}
                    value={password}
                    onchange={(e) => {
                      setPaswword(e.target.value)
                    }
                    } />
                  <InputType lableText={"Website"}
                    lableFor={"forwebsite"}
                    inputType={"text"}
                    name={"website"}
                    value={website}
                    onchange={(e) => {
                      setWebsite(e.target.value)
                    }
                    } />
                  <InputType lableText={"Address"}
                    lableFor={"forAddress"}
                    inputType={"text"}
                    name={"address"}
                    value={address}
                    onchange={(e) => {
                      setAddress(e.target.value)
                    }
                    } />
                  <InputType lableText={"Phone Number"}
                    lableFor={"forPhone"}
                    inputType={"text"}
                    name={"Phone"}
                    value={phone}
                    onchange={(e) => {
                      setPhone(e.target.value)
                    }
                    } />

                </>
              )
            }
          }
        })()}

        <div className="d-flex flex-row justify-content-between">
          {
            formType === 'login' ? (
              <p>Not Registerd Yet ?
                <NavLink to='/register'> Register</NavLink>
              </p>
            ) : (
              <p>Already have an Account !
                <NavLink to='/login'> Login</NavLink>
              </p>
            )
          }
          <button className='btn btn-primary' type='submit'>{submitButton}</button>
        </div>
      </form>

    </>
  )
}

export default Form
