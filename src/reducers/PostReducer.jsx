import { createReducer } from "@reduxjs/toolkit";
const initialState={}

export const postReducer = createReducer(initialState, {
      
    CreateRequest:(state)=>{
       state.loading= true;
    },
    CreateSuccess:(state, action)=>{
        state.loading =true;
        state.post = action.payload
    },
    CreateFailure:(state, action)=>{
        state.loading= true,
        state.post = action.payload
    },


    EditRequest:(state)=>{
       state.loading= true;
    },
    EditSuccess:(state, action)=>{
        state.loading =true;
        state.post = action.payload
    },
    EditFailure:(state, action)=>{
        state.loading= true,
        state.post = action.payload
    },
  
   
})