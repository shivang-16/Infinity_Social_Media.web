import axios from "axios";
import toast from 'react-hot-toast'
const server = 'https://social-media-app-backend-fd5u08epc-shivang-16.vercel.app/api/v1'


export const sinupUser = (name, userName, email, password)=> async(dispatch)=>{
    
   try {
    dispatch({
        type:"OtpRequest",
    })
    const {data} = await axios.post(`${server}/user/register`,{
        name, userName, email, password
    },{
        headers:{
            "Content-Type": "application/json"
        },
        withCredentials:true,
    })
    dispatch({
        type:"OtpSuccess",
        payload: data.message,
    })
    toast.success(data.message)
   } catch (error) {
    dispatch({
        type:"OtpFaliure",
        payload: data.message,
    })
    toast.error(data.message)
   }
}

export const verifyOtp = (otp)=> async(dispatch)=>{
    try {
        dispatch({
            type:"RegisterRequest",
        })
        const {data} = await axios.post(`${server}/user/verify`,{
            otp
        },{
            headers:{
                "Content-Type": "application/json"
            },
            withCredentials:true,
        })
        dispatch({
            type:"RegisterSuccess",
            payload: data.user,
        })
        toast.success(data.message)
       } catch (error) {
        console.log(error)
        dispatch({
            type:"RegisterFaliure",
            payload: data.message,
        })
        toast.error(data.message)
       }
}

export const loginUser = (loginIdentifier,password)=> async(dispatch)=>{
    try {
        dispatch({
            type:"LoginRequest",
        })
        const {data} = await axios.post(`${server}/user/login`,{
            loginIdentifier,password
        },{
            headers:{
                "Content-Type": "application/json"
            },
            withCredentials:true,
        })
        dispatch({
            type:"LoginSuccess",
            payload: data.user,
        })
        toast.success(data.message)
       } catch (error) {
        console.log(error)
        dispatch({
            type:"LoginFaliure",
            payload: error.response.data.message,
        })
        toast.error(data.message)
       }
}


export const loadUser = () => async (dispatch) => {
    try {
      dispatch({
        type: "LoadUserRequest",
      });
  
      const { data } = await axios.get(`${server}/user/myProfile`);
  
      dispatch({
        type: "LoadUserSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "LoadUserFailure",
        payload: error.response.data.message,
      });
    }
  };