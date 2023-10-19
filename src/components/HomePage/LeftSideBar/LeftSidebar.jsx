import React, { useState, useEffect } from "react";
import "./leftsidebar.scss";
import { Link, useNavigate } from "react-router-dom";
import home from "../../../assets/home.png";
import search from "../../../assets/search.png";
import userImg from "../../../assets/user.png";
import create from "../../../assets/create.png";
import connect from "../../../assets/connect.png";
import logout from "../../../assets/logout.png";
import homeDark from "../../../assets/homeDark.png";
import searchDark from "../../../assets/searchDark.png";
import userDark from "../../../assets/userDark.png";
import connectDark from "../../../assets/connectDark.png";
import options from "../../../assets/options.png";
import deleteIcon from "../../../assets/delete.png";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../actions/User";
import { getMyPost } from "../../../actions/Post";
import { getAllPost } from "../../../actions/Post";
import { createPost } from "../../../actions/Post";
import { deletePost } from "../../../actions/Post";
import photo from "../../../assets/user.png";
import Alert from "../../AlertPopup/Alert";
import SidebarDrawer from "../../SidebarDrawer/SidebarDrawer";

const LeftSidebar = () => {
  const [selectedOption, setSelectedOption] = useState(""); // Initialize with "home" selected
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.user);

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setImage(file);
    };
  };
  const handleCreatePost = async (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.append("caption", caption);
    myForm.append("file", image);

    await dispatch(createPost(myForm));
    await dispatch(getAllPost());
    closePopup();
  };

  const handleLogoutPopup = () => {
    setIsLogoutOpen(true);
  };
  const handleLogout = () => {
    dispatch(logoutUser());
    setIsLogoutOpen(false);
  };

  const handleDeletePopup = () => {
    setIsDeleteOpen(true);
  };

  const handleDelete = () => {
    dispatch(deletePost());
    setIsDeleteOpen(false);
  };
  // Function to handle the click on an option
  const handleOptionClick = (option) => {
    if (option !== selectedOption) {
      setSelectedOption(option);
    }
  };

  const handleAllPosts = () => {
    dispatch(getAllPost());
  };

  const handleMyPosts = () => {
    dispatch(getMyPost());
  };

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
    setCaption("");
    setImagePreview(null);
    setIsLogoutOpen(false);
    setIsDeleteOpen(false);
  };

  const openDrawer = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const toogleOptionPopup = () => {
    setIsOptionOpen((prevState) => !prevState);
  };

  return (
    <>
      <div className="leftSidebar-header">
        <h2>SocialApp</h2>
      </div>
      <div className="leftSidebar-content">
        <div className="leftSidebar-Upcontent">
          <Link to="/" onClick={handleAllPosts}>
            <div
              className={`left-boxes ${
                selectedOption === "home" ? "active" : ""
              }`}
              onClick={() => handleOptionClick("home")}
            >
              <img
                src={selectedOption === "home" ? homeDark : home}
                alt="Home"
              />
              <p>Home</p>
            </div>
          </Link>

          <div
            className={`left-boxes ${
              selectedOption === "search" ? "active" : ""
            }`}
            onClick={() => {
              handleOptionClick("search");
              openDrawer();
            }}
          >
            <img
              src={selectedOption === "search" ? searchDark : search}
              alt="Search"
            />
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
          <div className="left-boxes" onClick={openPopup}>
            <img src={create} alt="Create" />
            <p>Create</p>
          </div>
          <Link to="/profile" onClick={handleMyPosts}>
            <div className="left-boxes profile">
              <img src={user.avatar.url} alt="Profile" />
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
          {isOptionOpen && (
            <div className="options-box">
              <div onClick={handleLogoutPopup} className="left-boxes">
                <img src={logout} alt="Logout" />
                <p>Logout</p>
              </div>
              <div onClick={handleDeletePopup} className="left-boxes">
                <img src={deleteIcon} alt="Logout" />
                <p>Delete Account</p>
              </div>
              <div className="box"></div>
            </div>
          )}

          <div className="left-footer ">
            <p>SocialApp@2023</p>
          </div>
        </div>
      </div>
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <div className="popup-head">
              <img src={user.avatar.url} alt="" />
              <h2>Post</h2>
            </div>
            <span className="close-icon" onClick={closePopup}>
              &times;
            </span>
            <form onSubmit={handleCreatePost}>
              <textarea
                placeholder="Write your caption here"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                required
              />
              <div className="popup-foot">
                <input type="file" onChange={imageHandler} />
                <button>Post</button>
              </div>
              <div className="preview-image">
                {imagePreview && <img src={imagePreview} alt="Image Preview" />}
              </div>
            </form>
          </div>
        </div>
      )}

      {isLogoutOpen && (
        <Alert
          photo={userImg}
          description={"Are you sure want to logout"}
          action={"Logout"}
          actionFunction={handleLogout}
          closePopup={closePopup}
        />
      )}

      {isDeleteOpen && (
        <Alert
          photo={userImg}
          description={"Are you sure want to Delete Account"}
          action={"Delete"}
          actionFunction={handleDelete}
          closePopup={closePopup}
        />
      )}

      <SidebarDrawer isOpen={isDrawerOpen} onClose={closeDrawer} />
    </>
  );
};

export default LeftSidebar;
