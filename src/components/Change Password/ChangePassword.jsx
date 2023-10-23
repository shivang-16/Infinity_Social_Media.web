import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changePassword } from "../../actions/User";
import photo from "../../assets/photo.png";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const [userName, setUserName] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (
      newPassword.length < 6 ||
      !/\d/.test(newPassword) ||
      !/[!@#$%^&*]/.test(newPassword)
    ) {
      // New password doesn't meet the criteria
      toast.error(
        "New password must be at least 6 characters long and must contain at least one number and one special character.",
      );
    } else {
      await dispatch(changePassword(userName, otp, newPassword));
      navigate("/");
    }
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
            <p>Change Password</p>
            <form onSubmit={handleChangePassword}>
              <input
                type="text"
                placeholder="Enter your username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Enter the verification otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
              <button type="submit" className="form-btn">
                Confirm
              </button>
              {/* <button type="submit" className="form-btn">{userLoading ? <Loader/> : 'Confirm and Signup' }</button> */}
            </form>
            <span>or</span>
            <Link to="/forgotPassword">
              <p>Go Back</p>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default ChangePassword;
