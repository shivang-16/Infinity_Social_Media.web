import React, { useState , useEffect } from "react";
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
import connectDark from "../../../assets/connectDark.png";
import options from '../../../assets/options.png'
import deleteIcon from '../../../assets/delete.png'
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../actions/User";
import { getMyPost } from "../../../actions/Post";
import { getAllPost } from "../../../actions/Post";
import { createPost } from "../../../actions/Post";
import { deletePost } from "../../../actions/Post";
import photo from '../../../assets/user.png'
import Alert from "../../AlertPopup/Alert";

const LeftSidebar = () => {
  const [selectedOption, setSelectedOption] = useState(""); // Initialize with "home" selected
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen ] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen ] = useState(false)
  const [caption, setCaption] = useState("");
  const dispatch = useDispatch()

  const { isAuthenticated } = useSelector((state) => state.user);
 
  const handleLogoutPopup = () =>{
    setIsLogoutOpen(true)
  }
   const handleLogout = ()=>{
    dispatch(logoutUser());
    setIsLogoutOpen(false)
   }
  
   const handleDeletePopup = () =>{
       setIsDeleteOpen(true)
   }

   const handleDelete = () =>{
    dispatch(deletePost())
         setIsDeleteOpen(false)
   }
  // Function to handle the click on an option
  const handleOptionClick = (option) => {
    if (option !== selectedOption) {
      setSelectedOption(option);
    }
  };

   const handleAllPosts = () =>{
    dispatch(getAllPost())
   }

   const handleMyPosts = ()=>{
    dispatch(getMyPost())
   }
   

   
 
   const openPopup = () => {
     setPopupOpen(true);
   };

   const closePopup = () => {
     setPopupOpen(false);
     setIsLogoutOpen(false)
     setIsDeleteOpen(false)
   };
 
   const handlePost = () => {
    dispatch(createPost(caption))
     closePopup();
   };
 
   
   
   const toogleOptionPopup = () =>{
    setIsOptionOpen((prevState) => ! prevState)
   }
   

  return (
    <>
      <div className="leftSidebar-header">
        <h2>SocialApp</h2>
      </div>
      <div className="leftSidebar-content">
      <div className="leftSidebar-Upcontent">
        <Link to="/" onClick={handleAllPosts}>
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
        <div className='left-boxes' onClick={openPopup}>
          <img src={create} alt="Create" />
          <p>Create</p>
        </div>
        <Link to="/profile" onClick={handleMyPosts}>
          <div
            className={`left-boxes ${selectedOption === "profile" ? "active" : ""}`}
            onClick={() => handleOptionClick("profile")} 
          >
            <img src={selectedOption === "profile" ? userDark : user} alt="Profile" />
            <p>Profile</p>
          </div>
        </Link>
      </div>
      <div className="leftSidebar-Downcontent">
      <div className="left-boxes" onClick={toogleOptionPopup}>
          <img src={options} alt="" />
          <p>More</p>
        </div>
        
        {/* option box */}
       { isOptionOpen && <div className="options-box">
         
          <div onClick={handleLogoutPopup} className='left-boxes'>
          <img src={logout} alt="Logout" />
          <p>Logout</p>
        </div>
          <div onClick={handleDeletePopup} className="left-boxes">
          <img src={deleteIcon} alt="Logout" />
            <p>Delete Account</p>
          </div>
          <div className="box"></div>
        </div>}

        <div className="left-footer ">
          <p>SocialApp@2023</p>
        </div>
      </div>
      </div>
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <div className="popup-head">
            <img src={photo} alt="" />
            <h2>Post</h2>
            </div>
            <span className="close-icon" onClick={closePopup}>
              &times;
            </span>
            <textarea
              placeholder="Write your caption here"
              value={caption}
              onChange={e=> setCaption(e.target.value)}
              required
            />
            <div className="popup-foot">
            <span>Image</span>
            <button onClick={handlePost}>Post</button>
            
            </div>
          </div>
        </div>
      )}

      {isLogoutOpen && <Alert photo={user} 
      description={'Are you sure want to logout'} 
      action={'Logout'}
      actionFunction={handleLogout}
      closePopup={closePopup}
      />}

      {isDeleteOpen && <Alert photo={user} 
      description={'Are you sure want to Delete Account'} 
      action={'Delete'}
      actionFunction={handleDelete}
      closePopup={closePopup}
      />}
    </>
  );
};

export default LeftSidebar;
