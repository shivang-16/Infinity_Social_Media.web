import React, { useEffect } from "react";
import LeftSidebar from "../HomePage/LeftSideBar/LeftSidebar";
import { Link } from "react-router-dom";
import user2Img from "../../assets/user.png";
import { useSelector, useDispatch } from "react-redux";
import "./connect.scss";
import { followUser } from "../../actions/User";
import User from "../User/User";
import { getAllUser } from "../../actions/User";

const Connect = () => {
  const { users } = useSelector((state) => state.users);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleFollow = async (_id) => {
    await dispatch(followUser(_id));
    useEffect(() => {
      dispatch(getAllUser());
    }, []);
  };

  const isUserFollowed = (userId) =>
    user.following.some((follow) => follow._id === userId);
  return (
    <main>
      <div className="main-box left_sidebar">
        <LeftSidebar />
      </div>
      <div className="main-box middle-section">
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
                      <Link to="#">
                        <button onClick={() => handleFollow(_id)}>
                          {isAuthenticated && isUserFollowed(_id) ? (
                            <span className="unfollow">Following</span>
                          ) : (
                            <span className="follow">Follow</span>
                          )}
                        </button>
                      </Link>
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
