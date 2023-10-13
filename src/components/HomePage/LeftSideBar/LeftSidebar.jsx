import React, { useState } from "react";
import "./leftsidebar.scss";
import { Link, useNavigate } from "react-router-dom";
import home from "../../../assets/home.png";
import search from "../../../assets/search.png";
import user from "../../../assets/user.png";
import create from "../../../assets/create.png";
import connect from "../../../assets/connect.png";
import logout from "../../../assets/logout.png";
import homeDark from "../../../assets/homeDark.png";
import searchDark from "../../../assets/searchDark.png";
import userDark from "../../../assets/userDark.png";
import connectDark from "../../../assets/connectDark.png"; // Corrected the asset import name
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../actions/User";
import toast from "react-hot-toast";
import axios from "axios";

const LeftSidebar = () => {
  const [selectedOption, setSelectedOption] = useState("home"); // Initialize with "home" selected
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated } = useSelector((state) => state.user);

   const handleLogout = ()=>{
    dispatch(logoutUser());
   }
  
  // Function to handle the click on an option
  const handleOptionClick = (option) => {
    if (option !== selectedOption) {
      setSelectedOption(option);
    }
  };



  return (
    <>
      <div className="leftSidebar-header">
        <h2>SocialApp</h2>
      </div>
      <div className="leftSidebar-content">
        <Link to="/">
          <div
            className={`left-boxes ${selectedOption === "home" ? "active" : ""}`}
            onClick={() => handleOptionClick("home")}
          >
            <img src={selectedOption === "home" ? homeDark : home} alt="Home" />
            <p>Home</p>
          </div>
        </Link>

        <div
          className={`left-boxes ${selectedOption === "search" ? "active" : ""}`}
          onClick={() => handleOptionClick("search")}
        >
          <img src={selectedOption === "search" ? searchDark : search} alt="Search" />
          <p>Search</p>
        </div>
        <Link to="/connect">
          <div
            className={`left-boxes ${
              selectedOption === "connect" ? "active" : ""
            }`}
            onClick={() => handleOptionClick("connect")}
          >
            <img
              src={selectedOption === "connect" ? connectDark : connect}
              alt="Connect"
            />
            <p>Connect</p>
          </div>
        </Link>
        <div className={`left-boxes ${selectedOption === "create" ? "active" : ""}`}>
          <img src={create} alt="Create" />
          <p>Create</p>
        </div>
        <Link to="/profile">
          <div
            className={`left-boxes ${selectedOption === "profile" ? "active" : ""}`}
            onClick={() => handleOptionClick("profile")}
          >
            <img src={selectedOption === "profile" ? userDark : user} alt="Profile" />
            <p>Profile</p>
          </div>
        </Link>
        <div onClick={handleLogout} className={`left-boxes ${selectedOption === "logout" ? "active" : ""}`}>
          <img src={logout} alt="Logout" />
          <p>Logout</p>
        </div>
      </div>
    </>
  );
};

export default LeftSidebar;
