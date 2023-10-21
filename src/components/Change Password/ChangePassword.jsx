import React, {useState} from 'react'
import { Link } from 'react-router-dom'
const ChangePassword = () => {
    const [otp, setOtp] = useState('')
    const [password, setPassword] = useState('')
  return (
   <>
     <main id="login_page">
         
          <div className="form_area login_box">
            <div className="login_form">
              <h1 className='infinity'>Infinity</h1>
              <p>Change Password</p>
              <form>
                <input
                  type="text"
                  placeholder="Enter the verification otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Enter New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              <input type="submit" value="Confirm"/>
              </form>
              <span>or</span>
              <Link to="/forgotPassword">
                <p>Go Back</p>
              </Link>
            </div>
          </div>
        </main>
   </>
  )
}

export default ChangePassword