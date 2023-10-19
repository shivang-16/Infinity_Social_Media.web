import React from "react";
import "./rightsidebar.scss";
import { Link } from "react-router-dom";
import defaultImg from '../../../assets/user.png'
import { useSelector, useDispatch } from "react-redux";
import { followUser } from "../../../actions/User";
import { getAllUser } from "../../../actions/User";
import User from "../../User/User";

const RightSidebar = () => {
  const {
    user,
    loading: userLoading,
    isAuthenticated,
  } = useSelector((state) => state.user);
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleFollow = async (_id) => {
    await dispatch(followUser(_id));
    dispatch(getAllUser());
  };
  const isUserFollowed = (userId) =>
    user.following.some((follow) => follow._id === userId);
  return (
    <>
      <div className="right-main">
        <div className="rightSidebar-header">
          <div className="userImg">
            <img src={user.avatar?.url ? user.avatar?.url : defaultImg} alt="" />
          </div>
          {user ? (
            <div className="userDetail">
              <div className="username">
                <p>{user.userName}</p>
              </div>
              <div className="name">
                <p>{user.name}</p>
              </div>
            </div>
          ) : (
            <p>Login first</p>
          )}

          <div className="btn">
            <Link to="/profile">
              <button>View</button>
            </Link>
          </div>
        </div>
        <div className="rightSidebar-content">
          <div className="content-heading">
            <p>Suggested for you</p>
            <Link to="/connect">
              <p>See all</p>
            </Link>
          </div>
          <div className="content-body">
            {users
              ? users.map((element, index) => {
                  const { name, userName, _id, avatar } = element;
                  return user.userName !== userName ? (
                    <div className="suggestions" key={index}>
                      <User
                        userId={_id}
                        userName={userName}
                        name={name}
                        avatar={avatar?.url}
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
      </div>
    </>
  );
};

export default RightSidebar;
