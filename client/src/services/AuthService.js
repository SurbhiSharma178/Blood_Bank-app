import { userLogin, userRegister } from '../redux/features/auth/AuthActin'
import store from '../redux/store'

export const handleLogin=(e,email,password,role)=>{
  e.preventDefault()
  // console.log(role);
  
  try {
    if (!role || !email ||!password) {
      return alert("Please provide all fields")
    }
    store.dispatch(userLogin({email,password,role}))
    // console.log("login",e,email,password,role);
  } catch (error) {
    console.log("error "+error.message); 
  }
} 

export const handleRegister=(e,name,role,email,password,OrganisationName,hospitalName,website,address,phone)=>{
  e.preventDefault()
  try {
    // console.log("Register",e,name,role,email,password,OrganisationName,hospitalName,website,address,phone);
    store.dispatch(userRegister({name,role,email,password,OrganisationName,hospitalName,website,address,phone}))
    
  } catch (error) {
    console.log("Error "+error.message);
  }
}