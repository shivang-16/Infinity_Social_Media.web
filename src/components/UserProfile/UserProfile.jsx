import React, { useState } from "react";
import LeftSidebar from "../HomePage/LeftSideBar/LeftSidebar";
import RightSidebar from "../HomePage/RightSideBar/RightSidebar";
import { Link } from "react-router-dom";
import post from "../../assets/posts.png";
import bookmark from "../../assets/bookmark.png";
import linkIcon from "../../assets/link.png";
import locationIcon from "../../assets/location.png";
import dateIcon from "../../assets/date.png";
import bioIcon from "../../assets/bio.png";
import { useSelector, useDispatch } from "react-redux";
import "./userProfile.scss";
import PostBody from "../Posts/PostBody";
import Spinner2 from "../Spinner/Spinner2";
import User from "../User/User";
import { followUser } from "../../actions/User";
import { setProgress } from "../../reducers/LoadingBar";

const Users = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { users, loading: ProfileLoading } = useSelector(
    (state) => state.userProfile,
  );
  const { posts, loading: postsLoading } = useSelector(
    (state) => state.userposts,
  );
  const [isFollowersOpen, setFollowersOpen] = useState(false);
  const [isFollowingOpen, setFollowingOpen] = useState(false);

  const dispatch = useDispatch();

  const openFollowersPopup = () => {
    setFollowersOpen(true);
  };

  const openFollowingPopup = () => {
    setFollowingOpen(true);
  };

  const closePopup = () => {
    setFollowingOpen(false);
    setFollowersOpen(false);
  };

  const handleFollow = async (_id) => {
    dispatch(setProgress(10));
    await dispatch(followUser(_id));
    dispatch(setProgress(70));
    await dispatch(loadUser());
    dispatch(setProgress(100));
  };

  const isUserFollowed = (userId) =>
    user.following.some((follow) => follow._id === userId);

  return (
    <>
      <main>
        <div className="main-box left_sidebar">
          <LeftSidebar />
        </div>
        {ProfileLoading && postsLoading ? (
          <Spinner2 />
        ) : (
          <div className="main-box middle-section">
            <div className="user_details">
              <div className="user_section profile_details">
                {users ? (
                  users.map((element, index) => {
                    const {
                      userName,
                      name,
                      followers,
                      following,
                      posts,
                      description,
                      avatar,
                      _id,
                    } = element;
                    return (
                      <>
                        <div className="profile_box profile_photo">
                          <div className="image-profile">
                            <img src={avatar?.url} alt="No image" />
                          </div>
                        </div>

                        <div
                          className="profile_box profile_content"
                          key={index}
                        >
                          <div className="content_box user_name">
                            <span>{userName}</span>
                            {user.userName === userName ? (
                              <Link to="/profile">
                                {" "}
                                <button>Edit Profile</button>{" "}
                              </Link>
                            ) : (
                              <button
                                onClick={() => handleFollow(_id)}
                                className="userProfileFollowbtn"
                              >
                                {isAuthenticated && isUserFollowed(_id) ? (
                                  <span className="unfollow">Following</span>
                                ) : (
                                  <span className="follow">Follow</span>
                                )}
                              </button>
                            )}
                          </div>
                          <div className="content_box followers_details_section">
                            <div>
                              <p>{posts.length} Posts</p>
                            </div>
                            <div onClick={openFollowersPopup}>
                              <p>{followers.length} Followers</p>
                            </div>
                            <div onClick={openFollowingPopup}>
                              <p>{following.length} Following</p>
                            </div>
                          </div>
                          <div className="content_box user_descripton">
                            <h4>{name}</h4>
                            {users && description ? (
                              <>
                                {description.about ? (
                                  <p>
                                    <img src={bioIcon} alt="" />
                                    {description.about}
                                  </p>
                                ) : (
                                  ""
                                )}
                                {description.dob ? (
                                  <p>
                                    <img src={dateIcon} alt="" />
                                    {description.dob}
                                  </p>
                                ) : (
                                  ""
                                )}
                                {description.location ? (
                                  <p>
                                    <img src={locationIcon} alt="" />
                                    {description.location}
                                  </p>
                                ) : (
                                  ""
                                )}
                                {description.link ? (
                                  <p>
                                    <img src={linkIcon} alt="" />
                                    <a
                                      href={`${description.link}`}
                                      target="_blank"
                                    >
                                      {description.link}
                                    </a>
                                  </p>
                                ) : (
                                  ""
                                )}
                              </>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </>
                    );
                  })
                ) : (
                  <h2>Not found</h2>
                )}
              </div>
              <div className="user_section post_details">
                <div className="post_details_header">
                  <div className="posts detail_box active_class">
                    <img src={post} alt="" />
                    <span>Posts</span>
                  </div>
                </div>
                <div className="post_detail_content">
                  {posts
                    ? posts.map((element) => {
                        const {
                          caption,
                          _id,
                          likes,
                          owner,
                          comments,
                          image,
                          createdAt,
                        } = element;
                        return (
                          <PostBody
                            key={_id}
                            caption={caption}
                            postId={_id}
                            likes={likes}
                            owner={owner}
                            comments={comments}
                            image={image?.url}
                            createdAt={createdAt}
                          />
                        );
                      })
                    : "No post found"}
                </div>
              </div>
            </div>

            <div className="box right_sidebar">
              <RightSidebar />
            </div>
          </div>
        )}

        {users
          ? users.map((element) => {
              const { followers, following } = element;
              return (
                <>
                  {isFollowersOpen && (
                    <div className="popup">
                      <div className="popup-content">
                        <div
                          className="popup-head"
                          style={{ marginBottom: "10px" }}
                        >
                          <h2>Followers</h2>
                        </div>
                        <span className="close-icon" onClick={closePopup}>
                          &times;
                        </span>
                        {followers.length != 0
                          ? followers.map((element) => {
                              const { _id, userName, name, avatar } = element;
                              return (
                                <User
                                  key={_id}
                                  userId={_id}
                                  userName={userName}
                                  name={name}
                                  avatar={avatar?.url}
                                />
                              );
                            })
                          : "Not followed anyone"}
                      </div>
                    </div>
                  )}

                  {isFollowingOpen && (
                    <div className="popup">
                      <div className="popup-content">
                        <div
                          className="popup-head"
                          style={{ marginBottom: "10px" }}
                        >
                          <h2>Following</h2>
                        </div>
                        <span className="close-icon" onClick={closePopup}>
                          &times;
                        </span>
                        {following.length != 0
                          ? following.map((element) => {
                              const { _id, userName, name, avatar } = element;
                              return (
                                <User
                                  key={_id}
                                  userId={_id}
                                  userName={userName}
                                  name={name}
                                  avatar={avatar?.url}
                                />
                              );
                            })
                          : "Not followed anyone"}
                      </div>
                    </div>
                  )}
                </>
              );
            })
          : "Not Found"}
      </main>
    </>
  );
};

export default Users;
