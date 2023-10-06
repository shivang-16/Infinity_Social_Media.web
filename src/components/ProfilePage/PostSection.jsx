import React from "react";
import Profile from "./profile";
import LeftSidebar from "../HomePage/LeftSideBar/LeftSidebar";
import RightSidebar from "../HomePage/RightSideBar/RightSidebar";
import "../ProfilePage/profile.scss";
import { Link } from "react-router-dom";
import post from "../../assets/posts.png";
import bookmark from "../../assets/bookmark.png";
const PostSection = () => {
  return (
    <>
      <main>
        <div className="main-box left_sidebar">
          <LeftSidebar />
        </div>
        <div className="main-box middle-section">
          <div className="user_details">
            <Profile />
            <div className="user_section post_details">
              <div className="post_details_header">
                <Link to="/profile">
                  <div className="post detail_box">
                    <img src={post} alt="" />
                    <span>Posts</span>
                  </div>
                </Link>
                <Link to="/bookmark">
                  <div className="bookmark detail_box">
                    <img src={bookmark} alt="" />
                    <span>Bookmark</span>
                  </div>
                </Link>
              </div>
              <div className="post_detail_content">Posts</div>
            </div>
          </div>

          <div className="box right_sidebar">
            <RightSidebar />
          </div>
        </div>
      </main>
    </>
  );
};

export default PostSection;
