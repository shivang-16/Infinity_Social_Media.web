import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../main";


export const createPost = (caption) => async(dispatch)=>{
  try {
    dispatch({
        type: "CreateRequest",
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
        type: "CreateSuccess",
        payload: data.post
    })
   } catch (error) {
    dispatch({
        type: "CreateFailure",
        payload: error.response.data.message
    })
   }
}
export const getAllPost = (caption) => async(dispatch)=>{
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
        type: "CreateFailure",
        payload: error.response.data.message
    })
   }
}