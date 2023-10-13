import React, { useState, useEffect } from "react";
import "./middlesection.scss";
import PostBody from "../../Posts/PostBody";
import { getAllPost } from "../../../actions/Post";
import { useDispatch } from "react-redux";

const MiddleSection = () => {
  const [activeTab, setActiveTab] = useState("Explore");
  const dispatch = useDispatch()

  
  
  const handleAllPosts =()=>{
      dispatch(getAllPost())
      console.log("explore")
  }

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };



  return (
    <>
      <div className="middle-header">
        <h2>Home</h2>
        <div className="mid-header-section">
          <div onClick={handleAllPosts}>
            <h3 
              className={activeTab === "Explore" ? "active" : ""}
              onClick={() => handleTabClick("Explore")}
            >
              Explore
            </h3>
          </div>
          <div>
            <h3
              className={activeTab === "Following" ? "active" : ""}
              onClick={() => handleTabClick("Following")}
            >
              Following
            </h3>
          </div>
        </div>
      </div>
      <div className="middle-content">
        <PostBody />
      </div>
    </>
  );
};

export default MiddleSection;
