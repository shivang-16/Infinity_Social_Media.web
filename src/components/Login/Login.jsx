import React, { useState, useEffect } from "react";
import "../../components/Login/login.scss";
import photo from "../../assets/photo.png";
import { Link, Navigate } from "react-router-dom";
import { loginUser } from "../../actions/User";
import { loadUser } from "../../actions/User";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Spinner/Spinner";


const Login = () => {
  const { loading: userLoading , isAuthenticated} = useSelector((state) => state.user);
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async(e) => {
    e.preventDefault();
    await dispatch(loginUser(loginIdentifier, password));
    dispatch(loadUser())
  };
   

  return (
    <>
      {userLoading ? (
        <Spinner />
      ) : (
        <main id="login_page">
          <div className="brandImage login_box">
            <img src={photo} alt="" />
          </div>
          <div className="form_area login_box">
            <div className="login_form">
              <h1>Social App</h1>
              <p>Login to see photos and videos</p>
              <form onSubmit={handleLogin}>
                <input
                  type="text"
                  placeholder="Enter Email or Username"
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  required
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                
                <div className="check_box">
                
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                  <label>Show</label>
              </div>
                  
                <input type="submit" value="Login" />
              </form>
              <span>or</span>
              <Link to="/changePassword">
                <p>Forgotten Your Password?</p>
              </Link>
             
            </div>
            
            <div className="signup_link login_form">
              <span>Don't have an account?</span>
              <Link to="/signup">
                <span>SignUp</span>
              </Link>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default Login;
