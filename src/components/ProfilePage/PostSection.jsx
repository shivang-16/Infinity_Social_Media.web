import React from "react";
import Profile from "./profile";
import LeftSidebar from "../HomePage/LeftSideBar/LeftSidebar";
import RightSidebar from "../HomePage/RightSideBar/RightSidebar";
import "../ProfilePage/profile.scss";
import { Link } from "react-router-dom";
import post from "../../assets/posts.png";
import bookmark from "../../assets/bookmark.png";
import PostBody from "../Posts/PostBody";
import {useSelector} from 'react-redux'

const PostSection = () => {
  const {posts} = useSelector((state)=> state.myposts)

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
              <div className="post_detail_content">
              {posts ? (
          posts.map((element)=>{
            const {caption, _id, likes, owner, comments } = element 
            return (
            <PostBody
              key={_id}
              caption={caption}
              postId = {_id}
              likes ={likes}
              owner = {owner}
              comments= {comments}
            />
            )
          })
        ):(
          "No post found"
        )}
              </div>
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
