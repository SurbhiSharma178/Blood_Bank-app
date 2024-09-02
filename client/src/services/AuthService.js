export const handleLogin=(e,email,password,role)=>{
  e.preventDefault()
  try {
    if (!role || !email ||!password) {
      return alert("Please provide all fields")
    }
    console.log("login",e,email,password,role);
  } catch (error) {
    console.log("error "+error.message); 
  }
} 

export const handleRegister=(e,name,role,email,password,OrganisationName,hospitalName,website,address,phone)=>{
  e.preventDefault()
  try {
    console.log("Register",e,name,role,email,password,OrganisationName,hospitalName,website,address,phone);
    
  } catch (error) {
    console.log("Error "+error.message);
  }
}