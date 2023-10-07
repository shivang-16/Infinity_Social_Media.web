import React from 'react'
import '../../components/Login/login.scss'
import photo from '../../assets/loginPhoto.png'
import {Link} from 'react-router-dom'
const SignUp = () => {
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
        <input type="text" placeholder='Enter Name' />
        <input type="text" placeholder='Enter Username' />
        <input type="text" placeholder='Enter Email' />
        <input type="password" placeholder='Enter Password' />
        <input type="submit" value='SignUp'/>
    </form>
  
         
    </div>
    <div className='signup_link login_form'>
     <span>Already have account?</span>
     <Link to='/'>

     <span>Login</span>
     </Link>
     
    </div>
    </div>
   </main>
  )
}

export default SignUp