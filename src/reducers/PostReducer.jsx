import { createReducer } from "@reduxjs/toolkit";
const initialState={}


export const createPostReducer = createReducer(initialState, {
    CreatePostRequest:(state)=>{
        state.loading =true;
    },
    CreatePostSuccess:(state, action)=>{
        state.loading =false;
        state.message = action.payload;
    },
    CreatePostFailure:(state, action)=>{
        state.loading =false;
        state.error = action.payload;
    },
})

export const postReducer = createReducer(initialState, {

 
    GetPostRequest:(state)=>{
        state.loading =true;
    },
    GetPostSuccess:(state, action)=>{
        state.loading =false;
        state.post = action.payload;
    },
    GetPostFailure:(state, action)=>{
        state.loading =false;
        state.error = action.payload;
    },

  
   
})

export const likeReducer = createReducer(initialState, {

    LikeRequest:(state)=>{
        state.loading =true;
    },
    LikeSuccess:(state, action)=>{
        state.loading =false;
        state.message = action.payload;
    },
    LikeFailure:(state, action)=>{
        state.loading =false;
        state.error = action.payload;
    },
  
   
})

