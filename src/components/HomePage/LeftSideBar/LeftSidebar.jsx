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
import defaultImg from "../../../assets/user.png";
import connectDark from "../../../assets/connectDark.png";
import options from "../../../assets/options.png";
import deleteIcon from "../../../assets/delete.png";
import brandImg from "../../../assets/brand-logo.png";
import imageicon from "../../../assets/image.png";
import warninglogo from "../../../assets/warning.png";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../actions/User";
import { getMyPost } from "../../../actions/Post";
import { getAllPost } from "../../../actions/Post";
import { createPost } from "../../../actions/Post";
import { deletePost } from "../../../actions/Post";
import { getAllUser } from "../../../actions/User";
import Alert from "../../AlertPopup/Alert";
import SidebarDrawer from "../../SidebarDrawer/SidebarDrawer";
import { setProgress } from "../../../reducers/LoadingBar";

const LeftSidebar = () => {
  const [selectedOption, setSelectedOption] = useState("");
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

    dispatch(setProgress(10));
    await dispatch(createPost(myForm));
    dispatch(setProgress(60));
    await dispatch(getAllPost());
    dispatch(getMyPost());
    closePopup();
    dispatch(setProgress(100));
  };

  const handleLogoutPopup = () => {
    setIsLogoutOpen(true);
  };
  const handleLogout = () => {
    dispatch(setProgress(10));
    dispatch(logoutUser());
    dispatch(setProgress(60));
    setIsLogoutOpen(false);
    dispatch(setProgress(100));
  };

  const handleDeletePopup = () => {
    // setIsDeleteOpen(true);
  };

  const handleDelete = () => {
    dispatch(setProgress(10));
    dispatch(deletePost());
    dispatch(setProgress(60));
    setIsDeleteOpen(false);
    dispatch(setProgress(100));
  };
  // Function to handle the click on an option
  const handleOptionClick = (option) => {
    if (option !== selectedOption) {
      setSelectedOption(option);
    }
  };

  const handleConnect = () => {
    dispatch(setProgress(50));
    dispatch(getAllUser({}));
    dispatch(setProgress(100));
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
        <h1 className="infinity infinity-leftSideBar">Infinity</h1>
        <img src={brandImg} className="brandLogo brandLogo-leftSidebar" />
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
              onClick={() => {
                handleOptionClick("connect");
                handleConnect();
              }}
            >
              <img
                src={selectedOption === "connect" ? connectDark : connect}
                alt="Connect"
              />
              <p>Connect</p>
            </div>
          </Link>
          <div className="left-boxes" onClick={openPopup}>
            <img src={create} />
            <p>Create</p>
          </div>
          <Link to="/profile" onClick={handleMyPosts}>
            <div className="left-boxes profile">
              <img src={user.avatar?.url ? user.avatar?.url : defaultImg} />
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
                <img src={logout} alt="" />
                <p>Logout</p>
              </div>
              <Link to="/forgotPassword">
                <div className="left-boxes">
                  <img src={deleteIcon} alt="" />
                  <p>Change Password</p>
                </div>
              </Link>
              <div onClick={handleDeletePopup} className="left-boxes">
                <img src={deleteIcon} alt="" />
                <p>Delete Account**</p>
              </div>
              <div className="box"></div>
            </div>
          )}

          <div className="left-footer ">
            <p>Infinity@2023</p>
          </div>
        </div>
      </div>
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <div className="popup-head">
              <img src={user.avatar?.url} alt="" />
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
                <label htmlFor="fileInput" className="custom-file-input-label">
                  <img src={imageicon} alt="Custom Image" />
                </label>
                <input type="file" id="fileInput" onChange={imageHandler} />
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
          photo={warninglogo}
          description={"Are you sure want to logout"}
          action={"Logout"}
          actionFunction={handleLogout}
          closePopup={closePopup}
        />
      )}

      {isDeleteOpen && (
        <Alert
          photo={warninglogo}
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
