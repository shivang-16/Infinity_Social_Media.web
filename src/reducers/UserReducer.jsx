import { createSlice } from "@reduxjs/toolkit";
const initialState={}

export const userSlice = 
createSlice( {

     name: 'User',
     initialState,

     reducers:{
      RegisterRequest: (state, action)=>{
        state.loading = true;
      },
      RegisterSuccess: (state, action)=>{
        state.loading = false;
        state.user = action.payload
      },
      RegisterFailure: (state, action)=>{
        state.loading = false,
        state.error = action.payload
      },
     }
    //   LoginRequest: (state, action)=>{
    //     state.loading = true;
    //   },
    //   LoginSuccess: (state, action)=>{
    //     state.loading = false;
    //     state.user = action.payload
    //   },
    //   LoginFailure: (state, action)=>{
    //     state.loading = false,
    //     state.error = action.payload
    //   },


    //   RegisterRequest: (state, action)=>{
    //     state.loading = true;
    //   },
    //   RegisterSuccess: (state, action)=>{
    //     state.loading = false;
    //     state.user = action.payload
    //   },
    //   RegisterFailure: (state, action)=>{
    //     state.loading = false,
    //     state.error = action.payload
    //   },


    //   LoadUserRequest: (state, action)=>{
    //     state.loading = true;
    //   },
    //   LoadUserSuccess: (state, action)=>{
    //     state.loading = false;
    //     state.user = action.payload
    //   },
    //   LoadUserFailure: (state, action)=>{
    //     state.loading = false,
    //     state.error = action.payload
    //   },
})

export const {RegisterRequest, RegisterSuccess, RegisterFailure} = userSlice.actions
export default userSlice.reducer