import {createAsyncThunk} from "@reduxjs/toolkit"
import API from "../../../services/API"
import { toast } from 'react-toastify';

export const userLogin= createAsyncThunk(
  'auth/login',
  async({role,email,password},{rejectWithValue})=>{
    // console.log(role);
    
    try {
      const {data}=await API.post('/auth/login',{role,email,password})

      // store token
      if(data.success){
        localStorage.setItem('token',data.token)

        toast.success(data.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose:()=>{
            window.location.replace('/')
          }
          // transition:"Bounce",
          });
          
      }
      return data;
    } catch (error) {
      if(error.response && error.response.data.message){
        return rejectWithValue(error.response.data.message)
      }
      else{
        return rejectWithValue(error.message)
      }
    }
  }
)


// userRegister
 export const userRegister=createAsyncThunk(
  'auth/register',
  async({name,role,email,password,OrganisationName,hospitalName,website,address,phone},{rejectWithValue})=>{
    try {
      const{data} = await API.post('/auth/register',{name,role,email,password,OrganisationName,hospitalName,website,address,phone})
      if(data.success){
        toast.success(data.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          // transition:"Bounce",
          onClose:()=>{
            window.location.replace('/login')
          }
          });
        // toast.success(data.message)
        
      }
      
    } catch (error) {
      console.log(error.message);
      if(error.respose && error.respose.data.message){
        return rejectWithValue(error.respose.data.message)
      }
      else{
        return rejectWithValue(error.message)
      }
      
    }
  }
 )


//  current user
export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async ({ rejectWithValue }) => {
    try {
      const res = await API.get("/auth/current-user");
      if (res?.data) {
        return res?.data;
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
)

