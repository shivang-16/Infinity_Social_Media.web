import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { forgotPassword } from '../../actions/User'

const ForgotPassword = () => {
     const [email, setEmail] = useState('')
     const navigate = useNavigate()
     const dispatch = useDispatch()

     const handleForgot = async(e)=>{
      e.preventDefault()
       await dispatch(forgotPassword(email))
        navigate('/changePassword')
     }

  return (
   <>
     <main id="login_page">
         
          <div className="form_area login_box">
            <div className="login_form">
              <h1 className='infinity'>Infinity</h1>
              <p>Change Password</p>
              <form onSubmit={handleForgot}>
                <input
                  type="text"
                  placeholder="Enter the registered email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              <input type="submit" value="Verify Email"/>
              </form>
              <span>or</span>
              <Link to="/">
                <p>Go Back</p>
              </Link>
            </div>
          </div>
        </main>
   </>
  )
}

export default ForgotPassword