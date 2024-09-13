import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUser, userLogin, userRegister } from "./AuthActin";

const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;

const initialState = {
  loading: false,
  User: null,
  token,
  error: null
}

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducer: {},
  extraReducers: (builder) => {

    // Login user
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
      state.error = null
    })
    builder.addCase(userLogin.fulfilled, (state,{payload}) => {
      state.loading = false;
      state.User = payload.User;
      state.token =payload.token;
    })
    builder.addCase(userLogin.rejected,(state, {payload}) => {
      state.loading = false;
      state.error = payload;
      console.log(state.error)
   
    })

    // register User
    builder.addCase(userRegister.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    builder.addCase(userRegister.fulfilled, (state, { payload }) => {
      state.loading = false;
      // state.User = payload.User;
      state.succcess = true
    })
    builder.addCase(userRegister.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload
    })


    // Current User
    builder.addCase(getCurrentUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    builder.addCase(getCurrentUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.User = payload.currentUser;
      // state.User= payload.User
      // state.succcess = true
    })
    builder.addCase(getCurrentUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload
    })
  }

})

export default AuthSlice