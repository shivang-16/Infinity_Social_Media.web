/* eslint-disable no-unused-vars */
import React from "react";
import LeftSidebar from "../LeftSideBar/LeftSidebar";
import MiddleSection from "../MiddleSection/MiddleSection";
import RightSidebar from "../RightSideBar/RightSidebar";
import "./mainbody.scss";

const Mainbody = () => {
  return (
    <main>
      <div className="main-box left_sidebar">
        <LeftSidebar />
      </div>
      <div className="main-box middle-section">
        <div className="box post_section">
          <MiddleSection />
        </div>
        <div className="box right_sidebar">
          <RightSidebar />
        </div>
      </div>
    </main>
  );
};

export default Mainbody;
