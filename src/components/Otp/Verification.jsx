import React, {useState} from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { verifyOtp } from '../../actions/User'


const Verification = () => {

  const { isAuthenticated } = useSelector((state) => state.user);
const dispatch = useDispatch()
const navigate = useNavigate()
  const [otp, setOtp] = useState('')
  const hanldeVerify = (e)=>{
    e.preventDefault()
    dispatch(verifyOtp(otp))
  }
  if (isAuthenticated) return <Navigate to={"/"} />;
  return (
    <>
    <div className='login_form'>
    <form onSubmit={hanldeVerify}>
        <input type="text" placeholder='Enter your OTP' value={otp} onChange={e=>setOtp(e.target.value)}/>
        <input type="submit" value='Confirm and signup' />
    </form>
    </div>
    </>
  )
}

export default Verification