import React, { useEffect, useState } from "react";
import LeftSidebar from "../HomePage/LeftSideBar/LeftSidebar";
import { useSelector, useDispatch } from "react-redux";
import "./connect.scss";
import { followUser } from "../../redux/actions/User";
import User from "../../components/User/User";
import { loadUser } from "../../redux/actions/User";
import { setProgress } from "../../redux/reducers/LoadingBar";
import { getAllUser } from "../../redux/actions/User";

const Connect = () => {
  const { users } = useSelector((state) => state.users);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const handleFollow = async (_id) => {
    dispatch(setProgress(10));
    await dispatch(followUser(_id));
    dispatch(setProgress(70));
    await dispatch(loadUser());
    dispatch(setProgress(100));
  };

  useEffect(() => {
    dispatch(getAllUser({ limit: 8, page }));
  }, [dispatch, page]);

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleMore = () => {
    setPage(page + 1);
  };

  const isUserFollowed = (userId) =>
    user.following.some((follow) => follow._id === userId);
  return (
    <main>
      <div className="main-box left_sidebar">
        <LeftSidebar />
      </div>
      <div className="main-box middle-section middle-section-connect">
        <div className="middle-header middle-header-media-query">
          <h2>Home</h2>
        </div>
        <div className="connect_people hello">
          <div className="connect-header">
          <h2>Connect</h2>
          <button onClick={handleMore}>More</button>
          </div>
         
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

        <div className="connect-btn">
          <button onClick={handlePrev} disabled={page === 1}>
            Prev
          </button>
          <button onClick={handleMore} className="more">More</button>
        </div>
      </div>
    </main>
  );
};

export default Connect;
