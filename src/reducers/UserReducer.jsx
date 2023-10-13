import { createReducer } from "@reduxjs/toolkit";
const initialState={
  isAuthenticated: false
}

export const userReducer = 
createReducer(initialState, {
      OtpRequest: (state)=>{
        state.loading = true;
      },
      OtpSuccess: (state, action)=>{
        state.loading = false;
        state.message = action.payload
      },
      OtpFailure: (state, action)=>{
        state.loading = false,
        state.error = action.payload
      },


      RegisterRequest: (state)=>{
        state.loading = true;
      },
      RegisterSuccess: (state, action)=>{
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      },
      RegisterFailure: (state, action)=>{
        state.loading = false,
        state.error = action.payload;
        state.isAuthenticated =false;
      },


      LoginRequest: (state)=>{
        state.loading = true;
      },
      LoginSuccess: (state, action)=>{
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated =true;
      },
      LoginFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated =false;
      },
      
      LoadUserRequest: (state)=>{
        state.loading = true;
      },
      LoadUserSuccess: (state, action)=>{
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      },
      LoadUserFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;

      },

      LogoutRequest: (state)=>{
        state.loading = true;
        state.isAuthenticated=true;
      },
      LogoutSuccess: (state, action)=>{
        state.loading = false;
        state.message = action.payload;
        state.isAuthenticated =false;
      },
      LogoutFailure: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated =true;
      },
})