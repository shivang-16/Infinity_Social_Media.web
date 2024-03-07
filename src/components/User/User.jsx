import React from "react";
import user2Img from "../../assets/user.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../redux/actions/User";
import { getUserPost } from "../../redux/actions/Post";
import "./user.scss";

const User = ({ userName, name, userId, avatar }) => {
  const dispatch = useDispatch();
  const handleGetUserProfile = () => {
    dispatch(getUserProfile(userName));
  };
  const handleGetUserPost = () => {
    dispatch(getUserPost(userId));
  };

  return (
    <Link to={`/user/${userName}`}>
      <div
        className="user"
        onClick={() => {
          handleGetUserProfile();
          handleGetUserPost();
        }}
      >
        <div className="userImg">
          <img src={avatar ? avatar : user2Img} alt="" />
        </div>

        <div className="userDetail">
          <div className="username">
            <p>{name}</p>
          </div>
          <div className="name">
            <p>@{userName}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default User;
