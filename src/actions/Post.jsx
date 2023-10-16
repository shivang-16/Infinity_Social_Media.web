import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../main";


export const createPost = (caption) => async(dispatch)=>{
  try {
    dispatch({
        type: "CreatePostRequest",
    })
    const {data} = await axios.post(`${server}/post/create`,{
        caption
     },{
         headers:{
             "Content-Type": "application/json"
         },
         withCredentials: true
     })
     dispatch({
        type: "CreatePostSuccess",
        payload: data.message
    })
    toast.success(data.message)
   } catch (error) {
    console.log(error)
    dispatch({
        type: "CreatePostFailure",
        payload: error.response.data.message
    })
   }
}
export const getAllPost = () => async(dispatch)=>{
  try {
    dispatch({
        type: "GetPostRequest",
    })

    const {data} = await axios.get(`${server}/post/all`,{
        withCredentials: true
     })
     
     console.log(data.post)
     dispatch({
        type: "GetPostSuccess",
        payload: data.post
    })

   } catch (error) {
    console.log(error)
    dispatch({
        type: "GetPostFailure",
        payload: error.response.data.message
    })
   }
}

export const getMyPost = () => async(dispatch)=>{
  try {
    dispatch({
        type: "MyPostRequest",
    })

    const {data} = await axios.get(`${server}/user/me/posts`,{
        withCredentials: true
     })
     
     console.log(data)
     dispatch({
        type: "MyPostSuccess",
        payload: data.posts
    })

   } catch (error) {
    console.log(error)
    dispatch({
        type: "MyPostFailure",
        payload: error.response.data.message
    })
   }
}

export const getUserPost = (userId) => async(dispatch)=>{
  try {
    dispatch({
        type: "UserPostRequest",
    })

    const {data} = await axios.get(`${server}/user/posts/${userId}`,{
        withCredentials: true
     })
     
     console.log(data)
     dispatch({
        type: "UserPostSuccess",
        payload: data.posts
    })

   } catch (error) {
    console.log(error)
    dispatch({
        type: "UserPostFailure",
        payload: error.response.data.message
    })
   }
}

export const likePost = (_id) => async(dispatch)=>{
    console.log(_id)
    try {
        dispatch({
            type: "LikeRequest",
        })
    
        const {data} = await axios.get(`${server}/post/likes/${_id}`,{
            withCredentials: true
         })
         
      
         dispatch({
            type: "LikeSuccess",
            payload: data.message
        })
      console.log(data)
      toast.success(data.message)
       } catch (error) {
        console.log(error)
        dispatch({
            type: "LikeFailure",
            payload: error.response.data.message
        })
       }
}