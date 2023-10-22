import React, { useEffect } from "react";
import LeftSidebar from "../HomePage/LeftSideBar/LeftSidebar";
import { Link } from "react-router-dom";
import user2Img from "../../assets/user.png";
import { useSelector, useDispatch } from "react-redux";
import "./connect.scss";
import { followUser } from "../../actions/User";
import User from "../User/User";
import { loadUser } from "../../actions/User";
import { setProgress } from "../../reducers/LoadingBar";

const Connect = () => {
  const { users } = useSelector((state) => state.users);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleFollow = async (_id) => {
    dispatch(setProgress(10))
    await dispatch(followUser(_id));
    dispatch(setProgress(70))
    await dispatch(loadUser())
    dispatch(setProgress(100))
  };

  const isUserFollowed = (userId) =>
    user.following.some((follow) => follow._id === userId);
  return (
    <main>
      <div className="main-box left_sidebar">
        <LeftSidebar />
      </div>
      <div className="main-box middle-section">
      <div className="middle-header middle-header-media-query">
        <h2>Home</h2>
        </div>
        <div className="connect_people hello">
          <h2>Connect</h2>
          {users
            ? users.map((element, index) => {
                const { name, userName, _id, avatar } = element;
                return user.userName !== userName ? (
                  <div className="suggestions" key={index}>
                    <User
                      userId={_id}
                      userName={userName}
                      name={name}
                      avatar={avatar.url}
                    />
                    <div className="btn">
                     
                        <button onClick={() => handleFollow(_id)}>
                          {isAuthenticated && isUserFollowed(_id) ? (
                            <span className="unfollow">Following</span>
                          ) : (
                            <span className="follow">Follow</span>
                          )}
                        </button>
                    </div>
                  </div>
                ) : (
                  ""
                );
              })
            : "No users found"}
        </div>
      </div>
    </main>
  );
};

export default Connect;
