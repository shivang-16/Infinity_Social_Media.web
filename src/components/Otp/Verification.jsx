import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp } from "../../actions/User";
import Spinner from "../Spinner/Spinner";
import photo from "../../assets/photo.png";
import Loader from "../Spinner/Loader";

const Verification = () => {
  const { isAuthenticated, loading: userLoading } = useSelector(
    (state) => state.user,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const hanldeVerify = async (e) => {
    e.preventDefault();
    await dispatch(verifyOtp(otp));
    navigate("/details");
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
            <p>Verify OTP to register</p>
            <form onSubmit={hanldeVerify}>
              <input
                type="text"
                placeholder="Enter your OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button type="submit" className="form-btn">
                {userLoading ? <Loader /> : "Confirm and Signup"}
              </button>
              <Link to="/signup">
                <p>Go back</p>
              </Link>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Verification;
