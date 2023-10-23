import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../components/Login/login.scss";
import photo from "../../assets/photo.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sinupUser } from "../../actions/User";
import { useSelector } from "react-redux";
import Spinner from "../Spinner/Spinner";
import Loader from "../Spinner/Loader";
import toast from "react-hot-toast";

const SignUp = () => {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading: userLoading } = useSelector((state) => state.user);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (
      password.length < 6 ||
      !/\d/.test(password) ||
      !/[!@#$%^&*]/.test(password)
    ) {
      // Password doesn't meet the criteria
      toast.error(
        "Password must be at least 6 characters long and must contain at least one number and one special character.",
      );
    } else {
      await dispatch(sinupUser(name, userName, email, password));

      setName(name);
      setEmail(email);
      setUserName(userName);
      navigate("/verify");
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
            <p>Signup up to connect with developers</p>
            <form onSubmit={handleSignUp}>
              <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Enter Username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              <button type="submit" className="form-btn">
                {userLoading ? <Loader /> : "SignUp"}
              </button>
            </form>
          </div>
          <div className="signup_link login_form">
            <span>Already have an account?</span>
            <Link to="/">
              <span>Login</span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default SignUp;
