import { createReducer } from "@reduxjs/toolkit";
const initialState={}

export const postReducer = createReducer(initialState, {


    GetPostRequest:(state)=>{
        state.loading =true;
    },
    GetPostSuccess:(state, action)=>{
        state.loading =true;
        state.post = action.payload;
    },
    GetPostFailure:(state, action)=>{
        state.loading =true;
        state.error = action.payload;
    },
  
   
})