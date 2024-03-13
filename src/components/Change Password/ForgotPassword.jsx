import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../redux/actions/User";
import photo from "../../assets/photo.png";
import ChangePassword from "./ChangePassword";
import Loader from "../Spinner/Loader";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();

  const handleForgot = async (e) => {
    e.preventDefault();
    setLoading(true)
    await dispatch(forgotPassword(email));
    setLoading(false)
    setIsEmailSent(true)
  };

  console.log(isEmailSent, "isemalsend")
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
                {loading ? <Loader/> : "Verify email"}
              </button>
            </form>
            <span>or</span>
            <Link to="/">
              <p>Go Back</p>
            </Link>
          </div>
        </div>
     { isEmailSent && <div className="popup">
          <div className="popup-content">
            <span className="close-icon" onClick={() => setIsEmailSent(false)}>
              &times;
            </span>
             <ChangePassword email={email}/>
          </div>
        </div>}
        </main>
    </>

  
  );
};

export default ForgotPassword;
