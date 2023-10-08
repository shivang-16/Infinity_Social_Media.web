import axios from "axios";

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
   } catch (error) {
    dispatch({
        type:"OtpFaliure",
        payload: data.message,
    })
   }
}

export const verifyOtp = (otp)=> async(dispatch)=>{
    try {
        dispatch({
            type:"LoginRequest",
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
            type:"LoginSuccess",
            payload: data.user,
        })
       } catch (error) {
        console.log(error)
        dispatch({
            type:"LoginFaliure",
            payload: data.message,
        })
       }
}