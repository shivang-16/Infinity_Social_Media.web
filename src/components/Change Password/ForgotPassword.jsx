import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
     const [email, setEmail] = useState('')
     const navigate = useNavigate()
     const handleForgot = ()=>{
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