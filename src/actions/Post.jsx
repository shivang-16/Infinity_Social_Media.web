import toast from "react-hot-toast";
import axios from "axios";

const server = 'https://social-media-app-backend-fd5u08epc-shivang-16.vercel.app/api/v1'

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