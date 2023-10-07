import React from 'react'
import '../../components/Login/login.scss'
import photo from '../../assets/loginPhoto.png'
import {Link} from 'react-router-dom'
const Login = () => {
  return (
   <main id='login_page'>
    <div className="brandImage login_box">
        <img src={photo} alt="" />
    </div>
    <div className="form_area login_box">
    <div className="login_form">
   
    <h1>Social App</h1>
    <p>Login up to see photos and videos</p>
    <form>
        <input type="text" placeholder='Enter Email or Username' />
        <input type="password" placeholder='Enter Password' />
        <input type="submit" value='Login'/>
    </form>
    <span>or</span>
    <Link to='verify'>
        <p>Forgoten Your Password?</p>
    </Link>
         
    </div>
    <div className='signup_link login_form'>
     <span>Don't have account?</span>
     <Link to='/signup'>

     <span>SignUp</span>
     </Link>
     
    </div>
    </div>
   </main>
  )
}

export default Login