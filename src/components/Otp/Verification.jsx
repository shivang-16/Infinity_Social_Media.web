import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { verifyOtp } from "../../redux/actions/User";
import photo from "../../assets/photo.png";
import Loader from "../Spinner/Loader";

const Verification = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState("")

  const hanldeVerify = async (e) => {
    e.preventDefault();
    setLoading(true)
    await dispatch(verifyOtp(otp));
    navigate("/details");
    setLoading(false)
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
                {loading ? <Loader /> : "Confirm and Signup"}
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
