import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../actions/User";
import photo from "../../assets/photo.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleForgot = async (e) => {
    e.preventDefault();
    await dispatch(forgotPassword(email));
    navigate("/changePassword");
  };

  return (
    <>
      <main id="login_page">
        <div className="brandImage login_box">
          <img src={photo} alt="" />
        </div>
        <div className="form_area login_box">
          <div className="login_form">
            <h1 className="infinity">Infinity</h1>
            <p>Forgot Password</p>
            <form onSubmit={handleForgot}>
              <input
                type="text"
                placeholder="Enter the registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="form-btn">
                Verify email
              </button>
            </form>
            <span>or</span>
            <Link to="/">
              <p>Go Back</p>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default ForgotPassword;
