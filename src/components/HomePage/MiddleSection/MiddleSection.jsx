import React from "react";
import "./middlesection.scss";
import Post from "../../Posts/Post";

const MiddleSection = () => {
  return( 
  <>
   <div className="middle-header">
    <h2>Middle Header</h2>
    <span>Explore</span> <span>Following</span>
   </div>
   <div className="middle-content">
      
        <Post/>
        <Post/>
  
   </div>
  </>
  );
};

export default MiddleSection;
