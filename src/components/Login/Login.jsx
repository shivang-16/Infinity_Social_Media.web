import React, {useState, useEffect} from 'react'
import '../../components/Login/login.scss'
import photo from '../../assets/photo.png'
import { useNavigate } from 'react-router-dom'
import {Link} from 'react-router-dom'
import { loginUser } from '../../actions/User'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../Spinner/Spinner'
const Login = () => {
    const { loading: userLoading } = useSelector((state) => state.user);
    const [loginIdentifier, setLoginIdentifier] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    const handleLogin = (e)=>{
        e.preventDefault();
        dispatch(loginUser(loginIdentifier, password));
    
    }
    
    

    return (
        <>
        {userLoading ? (
              <Spinner />
            ) : (
          <main id='login_page'>
            
              <div className="brandImage login_box">
                <img src={photo} alt="" />
              </div>
              <div className="form_area login_box">
                <div className="login_form">
                  <h1>Social App</h1>
                  <p>Login up to see photos and videos</p>
                  <form onSubmit={handleLogin}>
                    <input type="text" placeholder='Enter Email or Username' value={loginIdentifier} onChange={e => setLoginIdentifier(e.target.value)} />
                    <input type="password" placeholder='Enter Password' value={password} onChange={e => setPassword(e.target.value)} />
                    <input type="submit" value='Login' />
                  </form>
                  <span>or</span>
                  <Link to='verify'>
                    <p>Forgotten Your Password?</p>
                  </Link>
                </div>
                <div className='signup_link login_form'>
                  <span>Don't have an account?</span>
                  <Link to='/signup'>
                    <span>SignUp</span>
                  </Link>
                </div>
              </div>
            
          </main>
          )}
        </>
      );
}

export default Login