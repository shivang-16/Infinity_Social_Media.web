import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp } from "../../actions/User";
import Spinner from "../Spinner/Spinner";

const Verification = () => {
  const { isAuthenticated, loading: userLoading } = useSelector(
    (state) => state.user,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [otp, setOtp] = useState("");
  const hanldeVerify = async(e) => {
    e.preventDefault();
    await dispatch(verifyOtp(otp));
    navigate('/details')
    
  };
 
  return (
    <>
      {userLoading ? (
        <Spinner />
      ) : (
        <main id="login_page">
       
        <div className="form_area login_box">
        <div className="login_form">
        <h1 className="infinity">Infinity</h1>
          <p>Verify OTP to register</p>
          <form onSubmit={hanldeVerify}>
            <input
              type="text"
              placeholder="Enter your OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <input type="submit" value="Confirm and signup" />
          </form>
        </div>
        </div>
        </main>
      )}
    </>
  );
};

export default Verification;
