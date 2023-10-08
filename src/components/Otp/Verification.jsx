import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { verifyOtp } from '../../actions/User'

const Verification = () => {

const dispatch = useDispatch()
const navigate = useNavigate()
  const [otp, setOtp] = useState('')
  const hanldeVerify = (e)=>{
    e.preventDefault()
    dispatch(verifyOtp(otp))
    navigate('/home')
  }
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