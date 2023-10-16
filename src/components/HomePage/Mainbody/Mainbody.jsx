import React, { useState } from "react";
import LeftSidebar from "../LeftSideBar/LeftSidebar";
import MiddleSection from "../MiddleSection/MiddleSection";
import RightSidebar from "../RightSideBar/RightSidebar";
import photo from "../../../assets/user.png"
import "./mainbody.scss";
import { useDispatch } from "react-redux";
import { createPost } from "../../../actions/Post";

const Mainbody = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [caption, setCaption] = useState("");
  const dispatch = useDispatch()

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };


  const handlePost = () => {
   dispatch(createPost(caption))
    closePopup();
  };

  return (
    <main>
     
      <div className="main-box left_sidebar">
        <LeftSidebar openPopup={openPopup}/>
      </div>
      <div className="main-box middle-section">
        <div className="box post_section">
          <MiddleSection />
         
        </div>
        <div className="box right_sidebar">
          <RightSidebar />
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
    </main>
  );
};

export default Mainbody;
