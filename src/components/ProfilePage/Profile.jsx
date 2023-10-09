import React from "react";

import photo from "../../assets/profilepic.jpg";
import { Link } from "react-router-dom";
import "../ProfilePage/profile.scss";
import { useSelector } from "react-redux";
const Profile = () => {
  const { user, loading: userLoading } = useSelector((state) => state.user);
  return (
    <>
      <div className="user_section profile_details">
        <div className="profile_box profile_photo">
          <div className="image">
            <img src={photo} alt="" />
          </div>
        </div>
        {user ? (
 <div className="profile_box profile_content">
          <div className="content_box user_name">
         
            <span>{user.userName}</span>
            <button>Edit Profile</button>
          </div>
          <div className="content_box followers_section">
            <span>0 Posts</span>
            <Link to="/followers">
              <span>{user.followers.length} Followers</span>
            </Link>
            <Link to="/following">
              <span>{user.following.length}  Following</span>
            </Link>
          </div>
          <div className="content_box user_descripton">
            <h4>{user.name}</h4>
            <p>Full stack web Developer</p>
            <p>23 Feb 2005</p>
            <p>github.com/shivang-16</p>
          </div>
        </div>
        ):(
          <h2>NOt found</h2>
        )}
       
      </div>
    </>
  );
};

export default Profile;
